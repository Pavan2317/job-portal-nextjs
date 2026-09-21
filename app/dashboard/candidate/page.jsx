'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Briefcase, CheckCircle, Search, LogOut } from 'lucide-react';

export default function CandidateDashboard() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    setAppliedJobs(jobs);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 max-w-7xl mx-auto text-gray-900 dark:text-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Candidate Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your job applications and explore new openings</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/jobs" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl flex items-center gap-2 transition shadow">
            <Search className="w-4 h-4" /> Browse Jobs
          </Link>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2.5 rounded-xl flex items-center gap-2 transition shadow"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/50 rounded-xl flex items-center justify-center text-blue-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Applied Jobs</p>
            <h3 className="text-2xl font-bold">{appliedJobs.length}</h3>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Your Applied Jobs</h2>
      {appliedJobs.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 p-12 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">You haven't applied to any jobs yet.</p>
          <Link href="/jobs" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium">
            Explore Jobs Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {appliedJobs.map((job) => (
            <div key={job.id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold mb-1">{job.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{job.company} &bull; {job.location} &bull; <span className="text-green-600 font-medium">Applied Successfully</span></p>
              </div>
              <Link href={`/jobs/${job.id}`} className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
