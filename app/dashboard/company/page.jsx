'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Briefcase, Users, Plus, LogOut, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function CompanyDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('companyJobs') || '[]');
    setJobs(savedJobs);

    const savedApps = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    setApplications(savedApps);
  }, []);

  const handleStatusChange = (appId, newStatus) => {
    const updatedApps = applications.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApps);
    localStorage.setItem('jobApplications', JSON.stringify(updatedApps));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 max-w-7xl mx-auto text-gray-900 dark:text-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Company Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your job postings and review candidate applications</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/post-job" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl flex items-center gap-2 transition shadow">
            <Plus className="w-4 h-4" /> Post New Job
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
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Jobs Posted</p>
            <h3 className="text-2xl font-bold">{jobs.length > 0 ? jobs.length : 1}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/50 rounded-xl flex items-center justify-center text-amber-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Candidate Applications</p>
            <h3 className="text-2xl font-bold">{applications.length}</h3>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Candidate Applications</h2>
      {applications.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 p-12 rounded-2xl border border-gray-200 dark:border-gray-800 text-center text-gray-500">
          No candidates have applied for your jobs yet.
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden mb-10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-xs uppercase font-semibold text-gray-500">
                  <th className="p-4">Candidate</th>
                  <th className="p-4">Job Role</th>
                  <th className="p-4">Current Status</th>
                  <th className="p-4 text-right">Actions / Change Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-sm">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition">
                    <td className="p-4 font-medium">
                      {app.candidateName}
                      <span className="block text-xs text-gray-400 font-normal">{app.candidateEmail}</span>
                    </td>
                    <td className="p-4">{app.jobTitle}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        app.status === 'Accepted' ? 'bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400' :
                        app.status === 'Rejected' ? 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400' :
                        'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400'
                      }`}>
                        {app.status === 'Accepted' && <CheckCircle className="w-3.5 h-3.5" />}
                        {app.status === 'Rejected' && <XCircle className="w-3.5 h-3.5" />}
                        {app.status === 'Reviewing' && <Clock className="w-3.5 h-3.5" />}
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => handleStatusChange(app.id, 'Reviewing')}
                        className="px-3 py-1 text-xs font-medium bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition"
                      >
                        Reviewing
                      </button>
                      <button 
                        onClick={() => handleStatusChange(app.id, 'Accepted')}
                        className="px-3 py-1 text-xs font-medium bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => handleStatusChange(app.id, 'Rejected')}
                        className="px-3 py-1 text-xs font-medium bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
