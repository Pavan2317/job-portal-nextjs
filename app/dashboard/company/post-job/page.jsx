'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addJob } from '@/app/data/jobsData';

export default function PostJobPage() {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Full-time');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    addJob({
      title,
      company,
      location,
      type,
      description: "Job posted via employer dashboard."
    });
    router.push('/dashboard/company');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow border border-gray-200 dark:border-gray-800 my-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Job Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. mern devloper" className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Company Name</label>
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Tata Consultancy Services (TCS)" className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. banglore" className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition">
          Publish Job
        </button>
      </form>
    </div>
  );
}
