import { useState } from 'react'
import React from 'react';
import UploadCard from '@/components/UploadCard';

function App() {
  const [count, setCount] = useState(0)

  return (

    <div className="bg-gray-100 font-sans min-h-screen">
      {/* Navigation Bar */}
      <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">RaceLap Analyzer</h1>
      </header>

      {/* Main Layout */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dashboard Panel */}
        <section className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold mb-4">New Upload</h2>
          <div className="space-y-2">
            <div className="bg-gray-100 p-2 rounded">Lap 1 Summary</div>
            <div className="bg-gray-100 p-2 rounded">Lap 2 Summary</div>
            <div className="bg-gray-100 p-2 rounded">Lap 3 Summary</div>
          </div>
        </section>

        {/* Upload Telemetry Section */}
        <section className="bg-white shadow rounded p-4 text-center">
          <h2 className="text-lg font-bold mb-4">Upload Telemetry Data</h2>
          <UploadCard />
        </section>

        {/* Lap Summary */}
        <section className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold mb-4">Lap Summary</h2>
          <p className="text-sm text-gray-700 mb-4">
            This was a smooth lap with consistent braking...
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded text-center">Speed</div>
            <div className="bg-gray-100 p-4 rounded text-center">RPM</div>
            <div className="bg-gray-100 p-4 rounded text-center">Throttle</div>
            <div className="bg-gray-100 p-4 rounded text-center">Braking</div>
          </div>
        </section>

        {/* Lap Comparison */}
        <section className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold mb-4">Lap Comparison</h2>
          <div className="flex space-x-4 mb-4">
            <select className="flex-1 border px-2 py-1 rounded">
              <option>Select Lap A</option>
            </select>
            <select className="flex-1 border px-2 py-1 rounded">
              <option>Select Lap B</option>
            </select>
            <button className="bg-blue-500 text-white px-4 py-1 rounded">Compare</button>
          </div>
          <p className="text-sm text-gray-700 mb-4">
            Lap A had a smoother throttle curve, while Lap B braked harder in Turn A.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded text-center">Speed</div>
            <div className="bg-gray-100 p-4 rounded text-center">RPM</div>
            <div className="bg-gray-100 p-4 rounded text-center">Throttle</div>
            <div className="bg-gray-100 p-4 rounded text-center">G-Force</div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default App
