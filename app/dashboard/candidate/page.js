'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CandidateDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // For demo/testing purposes, we can fetch all or filter by a sample email if needed.
  // Let's fetch all applications to show them neatly on the dashboard.
  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await fetch('/api/applications');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch applications');
        setApplications(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Candidate Dashboard</h1>
        <Link href="/jobs" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Browse Jobs
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <p className="text-sm text-gray-500 font-medium uppercase">Applications Submitted</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{applications.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <p className="text-sm text-gray-500 font-medium uppercase">Profile Status</p>
          <p className="text-xl font-semibold text-green-600 mt-2">Active (MongoDB)</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <p className="text-sm text-gray-500 font-medium uppercase">Database Storage</p>
          <p className="text-xl font-semibold text-purple-600 mt-2">Atlas Cloud Connected</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Job Applications</h2>

      {loading ? (
        <p className="text-gray-600">Loading applications from MongoDB Atlas...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : applications.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500 mb-4">You haven't submitted any job applications yet.</p>
          <Link href="/jobs" className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition">
            Find and Apply for Jobs
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Applied</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{app.jobTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{app.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{app.candidateName} ({app.candidateEmail})</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}