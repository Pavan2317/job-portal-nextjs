'use client';
import { useState, useEffect } from 'react';

export default function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());

  useEffect(() => {
    Promise.all([
      fetch('/api/jobs').then((res) => res.json()),
      fetch('/api/applications').then((res) => res.json())
    ])
      .then(([jobsData, appsData]) => {
        if (Array.isArray(jobsData)) {
          setJobs(jobsData);
        } else if (jobsData.jobs && Array.isArray(jobsData.jobs)) {
          setJobs(jobsData.jobs);
        } else if (jobsData.data && Array.isArray(jobsData.data)) {
          setJobs(jobsData.data);
        } else {
          setJobs([]);
        }

        const apps = Array.isArray(appsData) ? appsData : (appsData.applications || appsData.data || []);
        const appliedIds = new Set(apps.map(app => app.jobId?.toString()));
        setAppliedJobIds(appliedIds);
      })
      .catch((err) => {
        console.error('Error loading page data:', err);
      });
  }, []);

  const handleApply = async (job) => {
    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        jobId: job._id, 
        jobTitle: job.title, 
        company: job.company 
      }),
    });
    
    if (res.ok) {
      alert('Successfully applied!');
      setAppliedJobIds(prev => new Set(prev).add(job._id.toString()));
    } else {
      const errData = await res.json().catch(() => ({}));
      alert(errData.message || 'Failed to submit application.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Browse Available Jobs</h1>
        <a href="/dashboard/candidate" className="text-blue-600 underline">Back to Dashboard</a>
      </div>
      <div className="space-y-4">
        {Array.isArray(jobs) && jobs.map((job) => {
          const isApplied = appliedJobIds.has(job._id.toString());
          return (
            <div key={job._id} className="border p-4 rounded shadow bg-white">
              <h2 className="text-xl font-semibold text-blue-600">{job.title}</h2>
              <p className="text-gray-600">{job.company} • {job.location}</p>
              <p className="text-green-600 font-medium my-2">Salary: {job.salary}</p>
              <button 
                onClick={() => handleApply(job)} 
                disabled={isApplied}
                className={`px-4 py-2 rounded mt-2 transition text-white ${
                  isApplied ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isApplied ? 'Applied' : 'Apply'}
              </button>
            </div>
          );
        })}
        {(!Array.isArray(jobs) || jobs.length === 0) && (
          <p className="text-gray-500">No jobs available right now.</p>
        )}
      </div>
    </div>
  );
}
