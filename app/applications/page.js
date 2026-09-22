'use client';

import { useEffect, useState } from 'react';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchApplications() {
      try {
        setLoading(true);

        const response = await fetch('/api/applications', {
          cache: 'no-store'
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
            data.error ||
            'Failed to fetch applications'
          );
        }

        setApplications(data.applications || []);
      } catch (err) {
        console.error('Fetch Applications Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-50 text-green-700 border-green-200';

      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';

      case 'reviewing':
        return 'bg-blue-50 text-blue-700 border-blue-200';

      default:
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'accepted':
        return 'Accepted';

      case 'rejected':
        return 'Rejected';

      case 'reviewing':
        return 'Under Review';

      default:
        return 'Pending';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">
          My Applications
        </h1>

        <div className="bg-white p-12 rounded-xl border text-center text-gray-500 shadow-sm">
          Loading your applications...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">
          My Applications
        </h1>

        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          My Applications
        </h1>

        <p className="text-gray-500 mt-2">
          Track the jobs you have applied for and check your application status.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border text-center text-gray-500 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            You haven't applied to any jobs yet.
          </h2>

          <p>
            Apply for a job to see your application here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white p-6 rounded-xl border shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                <div>
                  <h3 className="font-bold text-xl">
                    {app.jobTitle || 'Job Application'}
                  </h3>

                  <p className="text-blue-600 font-semibold mt-1">
                    {app.company || 'Company'}
                  </p>

                  {app.candidateName && (
                    <p className="text-sm text-gray-600 mt-2">
                      Candidate: {app.candidateName}
                    </p>
                  )}

                  {app.candidateEmail && (
                    <p className="text-sm text-gray-500">
                      Email: {app.candidateEmail}
                    </p>
                  )}

                  <p className="text-sm text-gray-400 mt-2">
                    Applied on:{' '}
                    {app.createdAt
                      ? new Date(app.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>

                <div>
                  <span
                    className={`inline-flex px-4 py-2 rounded-full border text-sm font-semibold ${getStatusClass(
                      app.status
                    )}`}
                  >
                    {getStatusText(app.status)}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
