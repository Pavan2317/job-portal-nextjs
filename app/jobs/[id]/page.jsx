'use client';
import { jobs } from '@/app/data/jobsData';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function JobDetailsPage() {
  const params = useParams();
  const jobId = params?.id;
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (jobId) {
      const foundJob = jobs.find((j) => j.id === jobId) || jobs[0];
      setJob(foundJob);

      const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
      if (appliedJobs.some((j) => j.id === jobId)) {
        setApplied(true);
      }
    }
  }, [jobId]);

  const handleApply = () => {
    if (!job) return;
    
    // Get candidate info from storage or use a default authenticated profile
    const currentUser = JSON.parse(localStorage.getItem('user')) || { name: 'Candidate User', email: 'candidate@portal.com' };

    // Save to candidate's applied list
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    if (!appliedJobs.some((j) => j.id === job.id)) {
      appliedJobs.push(job);
      localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
    }

    // Save to company's incoming application list
    const jobApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    if (!jobApplications.some((app) => app.jobId === job.id && app.candidateEmail === currentUser.email)) {
      const newApplication = {
        id: Date.now().toString(),
        jobId: job.id,
        jobTitle: job.title,
        candidateName: currentUser.name || 'Candidate',
        candidateEmail: currentUser.email || 'candidate@portal.com',
        status: 'Reviewing'
      };
      jobApplications.push(newApplication);
      localStorage.setItem('jobApplications', JSON.stringify(jobApplications));
    }

    setApplied(true);
    alert('Successfully applied for job');
  };

  if (!job) {
    return <div className="min-h-screen p-6 text-center">Loading job details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 max-w-4xl mx-auto text-gray-900 dark:text-gray-100">
      <Link href="/jobs" className="text-blue-600 hover:underline font-medium text-sm mb-6 inline-block">
        &larr; Back to Jobs
      </Link>
      
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <h1 className="text-3xl font-extrabold mb-2">{job.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{job.company} &bull; {job.location}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-sm">
          <div>
            <span className="block text-gray-400 text-xs uppercase font-semibold">Job Type</span>
            <span className="font-medium">{job.type || "Full-time"}</span>
          </div>
          <div>
            <span className="block text-gray-400 text-xs uppercase font-semibold">Experience</span>
            <span className="font-medium">{job.experience || "1-3 Years"}</span>
          </div>
          <div>
            <span className="block text-gray-400 text-xs uppercase font-semibold">Salary</span>
            <span className="font-medium">{job.salary || "Competitive"}</span>
          </div>
          <div>
            <span className="block text-gray-400 text-xs uppercase font-semibold">Category</span>
            <span className="font-medium">{job.category || "Development"}</span>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-3">Job Description</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
          {job.description || "We are looking for a passionate professional to join our dynamic team and help build amazing software products."}
        </p>

        <button 
          onClick={handleApply}
          disabled={applied}
          className={`${applied ? 'bg-green-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium px-6 py-3 rounded-xl transition shadow`}
        >
          {applied ? 'Applied' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
}
