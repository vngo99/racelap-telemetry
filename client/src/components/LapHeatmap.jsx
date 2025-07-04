function HeatBar({ label, data, color }) {
    return (
        <div className="mb-2">
            <p className="text-sm font-bold mb-1">{label}</p>
            <div className="flex">
                {data.slice(0, 100).map((value, idx) => (
                    <div
                        key={idx}
                        className="h-4"
                        style={{
                            width: "1%",
                            backgroundColor: `rgba(${color},${value})`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
