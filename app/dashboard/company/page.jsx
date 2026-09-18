'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CompanyDashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs posted by the company on load
  useEffect(() => {
    fetch('/api/jobs')
      .then((res) => res.json())
      .then((data) => {
        const jobList = Array.isArray(data) ? data : data?.jobs || data?.data || [];
        setJobs(jobList);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching jobs:', err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (jobId) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setJobs(jobs.filter((job) => (job._id || job.id) !== jobId));
        alert('Job deleted successfully.');
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(errData.message || 'Failed to delete the job.');
      }
    } catch (err) {
      console.error('Error deleting job:', err);
      alert('An error occurred while deleting.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Company Dashboard</h1>
        <div className="flex gap-3">
          <a 
            href="/jobs/new" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            + Post New Job
          </a>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <p className="text-sm text-gray-500 uppercase font-semibold">Total Jobs Posted</p>
          <h2 className="text-4xl font-bold text-gray-800 mt-2">{jobs.length}</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <p className="text-sm text-gray-500 uppercase font-semibold">Pending Review Applications</p>
          <h2 className="text-4xl font-bold text-gray-800 mt-2">13</h2>
        </div>
      </div>

      {/* Posted Jobs Section */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Manage Posted Jobs</h2>
        
        {loading ? (
          <p className="text-gray-500">Loading your jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-500">No jobs posted yet. Click "+ Post New Job" to create one.</p>
        ) : (
          <div className="divide-y divide-gray-200">
            {jobs.map((job) => {
              const id = job._id || job.id;
              return (
                <div key={id} className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company} • {job.location} • <span className="font-medium text-gray-800">{job.jobType}</span></p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a 
                      href={`/jobs/edit/${id}`}
                      className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded text-sm font-medium hover:bg-gray-200 transition border border-gray-300"
                    >
                      Edit
                    </a>
                    <button 
                      onClick={() => handleDelete(id)}
                      className="bg-red-50 text-red-600 px-3 py-1.5 rounded text-sm font-medium hover:bg-red-100 transition border border-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}