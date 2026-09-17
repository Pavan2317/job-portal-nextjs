'use client';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [stats, setStats] = useState({ jobs: 0, applications: 0 });

  useEffect(() => {
    Promise.all([fetch('/api/jobs').then(r => r.json()), fetch('/api/applications').then(r => r.json())])
      .then(([j, a]) => setStats({ jobs: j.success ? j.data.length : 0, applications: a.success ? a.data.length : 0 }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">Job Portal</h1>
          <nav className="space-x-6 hidden md:flex font-medium text-sm">
            <a href="/" className="hover:text-blue-600">Home</a>
            <a href="/jobs" className="hover:text-blue-600">Browse Jobs</a>
            <a href="/applications" className="hover:text-blue-600">Applications</a>
            <a href="/dashboard" className="text-blue-600">Dashboard</a>
            <a href="/jobs/new" className="bg-blue-600 text-white px-3 py-1.5 rounded-lg">Post Job</a>
          </nav>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <p className="text-sm text-gray-500">Active Jobs</p>
            <h3 className="text-4xl font-extrabold mt-1">{stats.jobs}</h3>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <p className="text-sm text-gray-500">Applications Received</p>
            <h3 className="text-4xl font-extrabold mt-1">{stats.applications}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}