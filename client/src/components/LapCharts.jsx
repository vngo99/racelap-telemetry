import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function LapCharts({ data }) {
    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Telemetry Charts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["speed", "rpm", "throttle", "brake"].map((key) => (
                    <div key={key} className="bg-white p-4 shadow rounded">
                        <p className="text-sm font-bold mb-2">{key.toUpperCase()}</p>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={data}>
                                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey={key} stroke="#3b82f6" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ))}
            </div>
        </div>
    );
}
