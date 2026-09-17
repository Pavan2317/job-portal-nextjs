'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

const STATIC_JOBS = {
  1: {
    id: 1,
    title: 'java frontend',
    company: 'Moon66',
    location: 'vizag',
    salary: '3 lakhs',
    skills: 'java, Spring Boot, HTML, CSS',
    description: 'We are looking for a Java Frontend developer to join our dynamic team in Vizag. You will be responsible for building responsive user interfaces and integrating them with robust backend services.',
    requirements: ['1+ years of experience in Java & Web Technologies', 'Strong command of HTML, CSS, and JavaScript', 'Good understanding of REST APIs']
  },
  2: {
    id: 2,
    title: 'React Frontend Developer',
    company: 'Employer (Google / Tech)',
    location: 'Hyderabad',
    salary: '$90k - $120k',
    skills: 'React, Tailwind, Next.js',
    description: 'Join our core frontend engineering team to build lightning-fast web applications consumed by millions of users worldwide. Collaborate with product managers and UX designers.',
    requirements: ['3+ years with React and modern JavaScript frameworks', 'Proficiency with Tailwind CSS and responsive design', 'Experience with Next.js SSR is a big plus']
  },
  3: {
    id: 3,
    title: 'Full Stack Engineer',
    company: 'Employer (Microsoft / Tech)',
    location: 'Bangalore',
    salary: '$110k - $140k',
    skills: 'Node.js, React, MongoDB',
    description: 'We are scaling our engineering division and looking for versatile Full Stack Engineers. You will own features end-to-end from database schema design to frontend UI components.',
    requirements: ['Strong proficiency in Node.js and React ecosystem', 'Experience with NoSQL databases like MongoDB', 'Solid understanding of system architecture and cloud services']
  }
};

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.id;

  const [isDark, setIsDark] = useState(false);
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [currentUser, setCurrentUser] = useState({ name: 'Candidate User', email: 'candidate@example.com' });

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    let foundJob = null;
    if (jobId) {
      if (STATIC_JOBS[jobId]) {
        foundJob = STATIC_JOBS[jobId];
      } else {
        // Check dynamic company posted jobs in localStorage
        const savedCompanyJobs = localStorage.getItem('company_posted_jobs');
        if (savedCompanyJobs) {
          try {
            const parsed = JSON.parse(savedCompanyJobs);
            if (Array.isArray(parsed)) {
              const matched = parsed.find(j => String(j.id) === String(jobId));
              if (matched) {
                foundJob = {
                  id: matched.id,
                  title: matched.title,
                  company: matched.company || 'Company Employer',
                  location: matched.location,
                  salary: matched.salary,
                  skills: matched.skills,
                  description: matched.description || 'Exciting engineering role.',
                  requirements: ['Relevant industry experience', 'Strong problem solving skills', 'Team collaboration']
                };
              }
            }
          } catch (e) {}
        }
      }
    }

    if (foundJob) {
      setJob(foundJob);
    }

    const session = localStorage.getItem('user_session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed) setCurrentUser(parsed);
      } catch (e) {}
    }

    // Safely check application status
    const savedApps = localStorage.getItem('candidate_applications');
    if (savedApps) {
      try {
        const parsed = JSON.parse(savedApps);
        const appliedIds = Array.isArray(parsed) ? parsed : [];
        if (jobId && appliedIds.includes(Number(jobId))) {
          setApplied(true);
        }
      } catch (e) {
        console.error(e);
      }
    }

    return () => observer.disconnect();
  }, [jobId]);

  const handleApply = () => {
    if (!job) return;
    setApplied(true);
    setSuccessMsg('Successfully applied for this job!');

    // 1. Save ID to candidate_applications array
    const savedAppsRaw = localStorage.getItem('candidate_applications');
    let savedApps = [];
    try {
      const parsed = JSON.parse(savedAppsRaw);
      savedApps = Array.isArray(parsed) ? parsed : [];
    } catch (e) {}

    if (!savedApps.includes(job.id)) {
      savedApps.push(job.id);
      localStorage.setItem('candidate_applications', JSON.stringify(savedApps));
    }

    // 2. Push detailed applicant object to company_job_applications list for company dashboard
    const companyAppsRaw = localStorage.getItem('company_job_applications');
    let companyApps = [];
    try {
      const parsed = JSON.parse(companyAppsRaw);
      companyApps = Array.isArray(parsed) ? parsed : [];
    } catch (e) {}

    const alreadyExists = companyApps.some(app => app.email === currentUser.email && app.jobTitle === job.title);
    if (!alreadyExists) {
      const todayStr = new Date().toISOString().split('T')[0];
      const newAppRecord = {
        id: Date.now(),
        name: currentUser.name || 'Candidate User',
        email: currentUser.email || 'candidate@example.com',
        jobTitle: job.title,
        date: todayStr,
        status: 'Reviewing'
      };
      companyApps.unshift(newAppRecord);
      localStorage.setItem('company_job_applications', JSON.stringify(companyApps));
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-sm">
        <p>Loading job details or job not found...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-gray-950 text-gray-100' : 'bg-gray-50/50 text-gray-900'}`}>
      
      {/* Navbar */}
      <nav className={`px-8 py-4 border-b flex justify-between items-center ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-8">
          <span className="font-extrabold text-xl text-blue-600 tracking-tight">Candidate Portal</span>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-500">
            <a href="/dashboard/candidate" className="hover:text-blue-600">Home</a>
            <a href="/jobs" className="text-blue-600">Browse Jobs</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              document.documentElement.classList.toggle('dark');
              setIsDark(!isDark);
            }} 
            className="p-2 rounded-full border border-gray-200 dark:border-gray-800 text-xs"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <button 
            onClick={() => router.push('/dashboard/candidate')}
            className="text-xs font-semibold px-4 py-2 border rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </nav>

      {/* Main Job Details Content */}
      <div className="max-w-4xl w-full mx-auto px-6 py-10 flex-grow space-y-8">
        
        {successMsg && (
          <div className="bg-emerald-50 dark:bg-emerald-950 text-emerald-600 text-xs font-semibold px-5 py-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900 flex items-center justify-between">
            <span>{successMsg}</span>
            <button onClick={() => router.push('/dashboard/candidate')} className="underline font-bold">Return to Dashboard</button>
          </div>
        )}

        <div className={`p-8 sm:p-10 rounded-3xl border shadow-sm space-y-6 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full">{job.company}</span>
              <h1 className="text-3xl font-extrabold mt-3 tracking-tight">{job.title}</h1>
              <p className="text-xs text-gray-500 mt-1">{job.location} • <span className="font-semibold text-gray-700 dark:text-gray-300">{job.salary}</span></p>
            </div>

            <button
              onClick={handleApply}
              disabled={applied}
              className={`px-8 py-3.5 rounded-xl text-xs font-bold transition shadow-md ${
                applied 
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {applied ? 'Applied Successfully ✓' : 'Apply Now'}
            </button>
          </div>

          <hr className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`} />

          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">About the Role</h2>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{job.description}</p>
          </div>

          <div className="space-y-4 pt-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Key Requirements</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
              {job.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 pt-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.split(',').map((skill, idx) => (
                <span key={idx} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t dark:border-gray-800 flex justify-end">
            <button
              onClick={handleApply}
              disabled={applied}
              className={`px-8 py-3.5 rounded-xl text-xs font-bold transition shadow-md ${
                applied 
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {applied ? 'Applied Successfully ✓' : 'Apply for this Job'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}