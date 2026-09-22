'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/jobs')
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setJobs(result.data || []);
        }
      })
      .catch((error) => {
        console.error('Fetch Jobs Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-gray-500">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Available Jobs
        </h1>

        <p className="text-gray-500 mt-2">
          Find jobs posted by companies and apply for the positions you are interested in.
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white border rounded-xl p-10 text-center">
          <h2 className="text-xl font-semibold">
            No jobs available
          </h2>

          <p className="text-gray-500 mt-2">
            Companies have not posted any jobs yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">

          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border rounded-xl p-6 shadow-sm"
            >

              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">

                <div>
                  <h2 className="text-xl font-bold">
                    {job.title}
                  </h2>

                  <p className="text-blue-600 font-semibold mt-1">
                    {job.company}
                  </p>

                  <p className="text-gray-500 mt-2">
                    ?? {job.location}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">

                    {job.type && (
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs">
                        {job.type}
                      </span>
                    )}

                    {job.experience && (
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                        {job.experience}
                      </span>
                    )}

                    {job.salary && (
                      <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs">
                        {job.salary}
                      </span>
                    )}

                  </div>
                </div>

                <Link
                  href={`/jobs/${job._id}`}
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold text-center hover:bg-blue-700"
                >
                  View Job
                </Link>

              </div>

              {job.description && (
                <p className="text-gray-600 mt-5 line-clamp-2">
                  {job.description}
                </p>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
}
