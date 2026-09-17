'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CompanyDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchApplications = async () => {
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
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (appId, newStatus) => {
    setUpdatingId(appId);
    try {
      const res = await fetch(`/api/applications/${appId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status');
      
      // Update local state smoothly
      setApplications(applications.map(app => app._id === appId ? { ...app, status: newStatus } : app));
    } catch (err) {
      alert('Error updating status: ' + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Company Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage incoming candidate applications from MongoDB Atlas</p>
        </div>
        <div className="space-x-4">
          <Link href="/jobs/new" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
            Post New Job
          </Link>
          <Link href="/jobs" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            View All Jobs
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <p className="text-sm text-gray-500 font-medium uppercase">Total Applications</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{applications.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500 font-medium uppercase">Pending Review</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {applications.filter(app => app.status === 'Pending' || !app.status).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <p className="text-sm text-gray-500 font-medium uppercase">Database Backend</p>
          <p className="text-xl font-semibold text-purple-600 mt-2">MongoDB Atlas Active</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Candidate Submissions</h2>

      {loading ? (
        <p className="text-gray-600">Loading candidate submissions from MongoDB...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : applications.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500 mb-4">No candidates have applied to your jobs yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume & Cover Letter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{app.candidateName}</div>
                    <div className="text-sm text-gray-500">{app.candidateEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blue-600">{app.jobTitle}</div>
                    <div className="text-xs text-gray-500">{app.company}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm mb-1">
                      <a href={app.resumeLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                        📄 View Resume
                      </a>
                    </div>
                    {app.coverLetter && (
                      <p className="text-xs text-gray-600 italic max-w-xs truncate" title={app.coverLetter}>
                        &quot;{app.coverLetter}&quot;
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                      app.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                      app.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.status || 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <select
                      value={app.status || 'Pending'}
                      onChange={(e) => handleStatusChange(app._id, e.target.value)}
                      disabled={updatingId === app._id}
                      className="border border-gray-300 rounded px-2 py-1 text-xs bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
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