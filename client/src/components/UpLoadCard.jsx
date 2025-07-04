import React, { useState } from "react";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

export default function UploadCard() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("Drag & drop a CSV or JSON file");
    const [isLoading, setIsLoading] = useState(false);
    const [lapStats, setLapStats] = useState(null);
    const [lapSummary, setLapSummary] = useState("");
    const [lapData, setLapData] = useState(null);

    const handleDrop = (e) => {
        e.preventDefault();
        const uploadedFile = e.dataTransfer.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setMessage(`Selected: ${uploadedFile.name}`);
        }
    };

    const handleBrowse = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setMessage(`Selected: ${uploadedFile.name}`);
        }
    };

    const analyzeLap = async (lapId) => {
        const res = await fetch(`http://localhost:5000/analyze/${lapId}`);
        const data = await res.json();
        setLapSummary(data.summary);
    };

    const fetchLapData = async (lapId) => {
        const res = await fetch(`http://localhost:5000/lap/${lapId}`);
        const data = await res.json();
        setLapData(data);
    };

    const handleSubmit = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            setLapStats(data.stats);
            await analyzeLap(data.lap_id);
            await fetchLapData(data.lap_id);
        } catch (error) {
            alert("❌ Upload failed.");
        } finally {
            setIsLoading(false);
        }
    };

    const HeatBar = ({ label, data, color }) => (
        <div className="mb-2">
            <p className="text-sm font-bold mb-1">{label}</p>
            <div className="flex h-4 rounded overflow-hidden">
                {data.slice(0, 100).map((value, i) => (
                    <div
                        key={i}
                        className="h-full"
                        style={{
                            width: "1%",
                            backgroundColor: `rgba(${color},${value})`,
                        }}
                    />
                ))}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
            {/* Upload box */}
            <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="w-full border-2 border-dashed border-gray-400 bg-gray-50 p-10 rounded text-center cursor-pointer"
            >
                <input
                    type="file"
                    accept=".csv,.json"
                    className="hidden"
                    id="fileUpload"
                    onChange={handleBrowse}
                />
                <label htmlFor="fileUpload" className="block cursor-pointer">
                    <div className="text-gray-600 font-medium">{message}</div>
                    <div className="text-sm text-gray-400 mt-2">Click to browse</div>
                </label>
            </div>

            {/* Upload button */}
            <button
                onClick={handleSubmit}
                disabled={!file || isLoading}
                className={`mt-4 px-6 py-2 rounded text-white ${file && !isLoading ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                    }`}
            >
                {isLoading ? "Uploading..." : "Upload"}
            </button>

            {/* AI Summary */}
            {lapSummary && (
                <div className="mt-6 w-full bg-yellow-50 border border-yellow-300 p-4 rounded">
                    <h3 className="font-semibold mb-2 text-sm">AI Lap Summary</h3>
                    <p className="text-sm whitespace-pre-line">{lapSummary}</p>
                </div>
            )}

            {/* Stats */}
            {lapStats && (
                <div className="mt-4 w-full text-left bg-white rounded shadow p-4">
                    <h3 className="text-lg font-semibold mb-2">Lap Stats:</h3>
                    <ul className="space-y-1 text-sm">
                        <li><strong>Max Speed:</strong> {lapStats.max_speed} km/h</li>
                        <li><strong>Avg RPM:</strong> {lapStats.avg_rpm}</li>
                        <li><strong>Brake Zones:</strong> {lapStats.brake_zones}</li>
                        <li><strong>Throttle Samples:</strong> {lapStats.throttle_profile?.slice(0, 5).join(", ")}...</li>
                    </ul>
                </div>
            )}

            {/* Charts */}
            {lapData && (
                <div className="mt-6 w-full">
                    <h3 className="text-lg font-semibold mb-2">Telemetry Charts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["speed", "rpm", "throttle", "brake"].map((key) => (
                            <div key={key} className="bg-white p-4 shadow rounded">
                                <p className="text-sm font-bold mb-2">{key.toUpperCase()}</p>
                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart data={lapData}>
                                        <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey={key} stroke="#3b82f6" dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        ))}
                    </div>

                    {/* Heatmaps */}
                    <div className="mt-6 bg-white p-4 shadow rounded">
                        <h3 className="text-sm font-bold mb-2">Throttle / Brake Heatmaps</h3>
                        <HeatBar label="Throttle Map" data={lapData.map(d => d.throttle)} color="34,197,94" />
                        <HeatBar label="Brake Map" data={lapData.map(d => d.brake)} color="239,68,68" />
                    </div>
                </div>
            )}
        </div>
    );
}

