'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PostJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    skills: '',
    description: '',
    requirements: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Format requirements into an array split by commas
      const formattedData = {
        ...formData,
        requirements: formData.requirements ? formData.requirements.split(',').map(r => r.trim()) : []
      };

      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to post job');
      }

      router.push('/jobs');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Post a New Job</h1>
      
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input type="text" name="company" required value={formData.company} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Salary</label>
          <input type="text" name="salary" required value={formData.salary} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Required Skills</label>
          <input type="text" name="skills" required placeholder="e.g. React, Node.js, MongoDB" value={formData.skills} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" rows="4" value={formData.description} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Requirements (comma separated)</label>
          <input type="text" name="requirements" placeholder="e.g. 3+ years experience, Degree in CS" value={formData.requirements} onChange={handleChange} className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <button type="submit" disabled={loading} className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-blue-300">
          {loading ? 'Posting to MongoDB...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
}