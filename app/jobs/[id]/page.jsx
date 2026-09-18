'use client';
import { useState, useEffect, use } from 'react';

export default function JobDetailsPage({ params }) {
  const resolvedParams = use(params);
  const jobId = resolvedParams.id;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    if (!jobId) return;

    Promise.all([
      fetch(`/api/jobs/${jobId}`).then(res => res.json()).catch(() => null),
      fetch('/api/applications').then(res => res.json()).catch(() => [])
    ])
      .then(([jobData, appsData]) => {
        const foundJob = jobData?.job || jobData?.data || jobData;
        setJob(foundJob);

        const apps = Array.isArray(appsData) ? appsData : (appsData.applications || appsData.data || []);
        const alreadyApplied = apps.some(app => app.jobId?.toString() === jobId);
        setIsApplied(alreadyApplied);

        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading job details:', err);
        setLoading(false);
      });
  }, [jobId]);

  const handleApply = async () => {
    if (!job) return;

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
      alert('Application submitted successfully!');
      setIsApplied(true);
    } else {
      const errData = await res.json().catch(() => ({}));
      alert(errData.message || 'Failed to submit application.');
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading job details...</div>;
  }

  if (!job) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Job Not Found</h1>
        <p className="text-gray-600 mb-4">The job you are looking for might have been removed or doesn't exist.</p>
        <a href="/dashboard/candidate" className="text-blue-600 underline">Back to Dashboard</a>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow border border-gray-200 mt-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-600 mb-2">{job.title}</h1>
          <p className="text-lg text-gray-700 font-medium">{job.company} • {job.location}</p>
        </div>
        <a href="/dashboard/candidate" className="text-sm text-blue-600 underline">Back to Dashboard</a>
      </div>

      <div className="mb-6 space-y-2 border-t border-b py-4">
        <p><strong className="text-gray-700">Salary:</strong> <span className="text-green-600 font-semibold">{job.salary || 'Not specified'}</span></p>
        <p><strong className="text-gray-700">Job Type:</strong> {job.jobType || 'Full-time'}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <p className="text-gray-600 whitespace-pre-line">{job.description || 'No description provided by the company.'}</p>
      </div>

      <button 
        onClick={handleApply} 
        disabled={isApplied}
        className={`px-6 py-3 rounded text-white font-semibold transition ${
          isApplied ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {isApplied ? 'Applied' : 'Apply Now'}
      </button>
    </div>
  );
}