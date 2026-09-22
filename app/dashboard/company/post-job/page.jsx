'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PostJobPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    skills: '',
    experience: '',
    type: 'Full-time',
    description: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const savedUser = localStorage.getItem('user');

      if (!savedUser) {
        alert('Please login as a company first.');
        return;
      }

      const user = JSON.parse(savedUser);

      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...form,
          companyId: user.id,
          company: form.company || user.name
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to post job');
      }

      alert('Job posted successfully!');
      router.push('/dashboard/company');

    } catch (error) {
      console.error('Post Job Error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <h1 className="text-3xl font-bold mb-2">
          Post New Job
        </h1>

        <p className="text-gray-500 mb-8">
          Add a new job opening for candidates.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block font-semibold mb-2">
              Job Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="e.g. React Developer"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Company Name
            </label>
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="e.g. TCS"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Location
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              placeholder="e.g. Hyderabad"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Salary
            </label>
            <input
              name="salary"
              value={form.salary}
              onChange={handleChange}
              placeholder="e.g. ?6L - ?10L"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Skills
            </label>
            <input
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="e.g. React, JavaScript, MongoDB"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Experience
            </label>
            <input
              name="experience"
              value={form.experience}
              onChange={handleChange}
              placeholder="e.g. 1-3 Years"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Job Type
            </label>

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Job Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="6"
              placeholder="Describe the job responsibilities and requirements..."
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Posting Job...' : 'Post Job'}
          </button>

        </form>
      </div>
    </div>
  );
}
