'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function ApplyJobPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id;

  const [job, setJob] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    resumeLink: '',
    coverLetter: ''
  });

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const res = await fetch(`/api/jobs/${jobId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch job');
        setJob(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingJob(false);
      }
    }
    if (jobId) fetchJobDetails();
  }, [jobId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const payload = {
        jobId,
        jobTitle: job.title,
        company: job.company,
        ...formData
      };

      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit application');

      alert('Application submitted successfully to MongoDB Atlas!');
      router.push('/dashboard/candidate');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingJob) return <div className="text-center mt-20 text-gray-600">Loading job details...</div>;
  if (error && !job) return <div className="text-center mt-20 text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Apply for {job?.title}</h1>
      <p className="text-gray-600 mb-6">Company: <span className="font-semibold">{job?.company}</span></p>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" name="candidateName" required value={formData.candidateName} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" name="candidateEmail" required value={formData.candidateEmail} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Resume Link (URL)</label>
          <input type="url" name="resumeLink" placeholder="https://drive.google.com/..." required value={formData.resumeLink} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
          <textarea name="coverLetter" rows="4" placeholder="Tell us why you are a great fit..." value={formData.coverLetter} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>

        <button type="submit" disabled={submitting} className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-blue-300">
          {submitting ? 'Submitting to MongoDB...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}