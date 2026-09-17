'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch('/api/jobs');
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch jobs');
        }

        setJobs(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-gray-600">Loading jobs from MongoDB Atlas...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Available Jobs</h1>
        <Link href="/jobs/new" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Post a Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <p className="text-gray-500 text-center py-10 bg-white rounded-lg shadow">No jobs available right now. Be the first to post one!</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-blue-600">{job.title}</h2>
              <p className="text-gray-700 font-medium">{job.company} • <span className="text-gray-500">{job.location}</span></p>
              <p className="text-green-600 font-semibold mt-2">Salary: {job.salary}</p>
              <p className="text-gray-600 mt-2 text-sm line-clamp-2">{job.description}</p>
              
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded">Skills: {job.skills}</span>
                <Link href={`/jobs/${job._id}`} className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 transition">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}