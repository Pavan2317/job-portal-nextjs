'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditJobPage() {
  const params = useParams();
  const jobId = params?.id;
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    jobType: 'Full-time',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!jobId) return;

    fetch(`/api/jobs/${jobId}`)
      .then((res) => res.json())
      .then((data) => {
        const job = data?.job || data?.data || data;
        if (job) {
          setFormData({
            title: job.title || '',
            company: job.company || '',
            location: job.location || '',
            salary: job.salary || '',
            jobType: job.jobType || 'Full-time',
            description: job.description || ''
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading job for edit:', err);
        setLoading(false);
      });
  }, [jobId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch(`/api/jobs/${jobId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Job updated successfully!');
      router.push('/dashboard/company');
    } else {
      const errData = await res.json().catch(() => ({}));
      alert(errData.message || 'Failed to update job.');
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading job data...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow border border-gray-200 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Job Posting</h1>
        <a href="/dashboard/company" className="text-sm text-blue-600 underline">Back to Dashboard</a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
            className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input 
            type="text" 
            name="company" 
            value={formData.company} 
            onChange={handleChange} 
            required 
            className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              required 
              className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
            <input 
              type="text" 
              name="salary" 
              value={formData.salary} 
              onChange={handleChange} 
              className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
          <select 
            name="jobType" 
            value={formData.jobType} 
            onChange={handleChange} 
            className="w-full border rounded p-2 bg-white focus:ring focus:ring-blue-300"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
          <textarea 
            name="description" 
            rows="5" 
            value={formData.description} 
            onChange={handleChange} 
            required 
            className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={saving}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          {saving ? 'Saving Changes...' : 'Update Job'}
        </button>
      </form>
    </div>
  );
}