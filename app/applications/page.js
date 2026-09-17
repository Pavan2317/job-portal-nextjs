'use client';
import { useEffect, useState } from 'react';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const savedApps = JSON.parse(localStorage.getItem('myApplications') || '[]');
    setApplications(savedApps);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>
      {applications.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border text-center text-gray-500 shadow-sm">
          You haven't applied to any jobs yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((app, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{app.title}</h3>
                <p className="text-sm text-gray-600">{app.company}</p>
                <p className="text-xs text-gray-400 mt-1">Applied on: {app.date}</p>
              </div>
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                Submitted
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}