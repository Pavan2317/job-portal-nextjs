'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sun, Moon, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id;

  const [job, setJob] = useState(null);
  const [user, setUser] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // 1. Check logged-in user from localStorage
    const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(savedUser);

    // 2. Check dark mode
    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // 3. Sample job data
    const sampleJobs = {
      '3': {
        id: '3',
        title: 'mern developer',
        company: 'Tata Consultancy Services (TCS)',
        location: 'banglore',
        type: 'Full-time',
        experience: '1-3 Years',
        salary: '₹6L - ₹12L',
        category: 'Full Stack',
        description: 'MERN stack developer role building modern web applications.'
      }
    };
    setJob(sampleJobs[jobId] || {
      id: jobId,
      title: 'Software Engineer',
      company: 'Tech Corp',
      location: 'Hyderabad',
      type: 'Full-time',
      experience: '2-4 Years',
      salary: '₹8L - ₹15L',
      category: 'Full Stack',
      description: 'Looking for a passionate developer.'
    });

    // 4. Check if user already applied from database via API
    if (savedUser && savedUser.id) {
      fetch(`/api/jobs/apply?userId=${savedUser.id}&jobId=${jobId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.applied) {
            setHasApplied(true);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [jobId]);

  const handleApply = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/api/jobs/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          jobId: jobId,
          email: user.email
        }),
      });

      const data = await response.json();
      if (data.success) {
        setHasApplied(true);
        setShowPopup(true);
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  };

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  if (!job) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors relative">
      
      {/* Success Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-xl max-w-sm w-full text-center animate-in fade-in zoom-in">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Success!</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Job Applied Successfully!</p>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Navbar Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold text-blue-600 dark:text-blue-500">
            JobPortal
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/jobs" className="hover:text-blue-600">Jobs</Link>
            <Link href="/companies" className="hover:text-blue-600">Companies</Link>
            {user && (
              <Link href={user.role === 'company' ? '/dashboard/company' : '/dashboard/candidate'} className="hover:text-blue-600 font-semibold text-blue-600">
                Dashboard
              </Link>
            )}
          </nav>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition cursor-pointer"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-700" />}
            </button>
            {user ? (
              <span className="text-sm font-medium">Welcome, {user.name}</span>
            ) : (
              <Link href="/login" className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-xl">Login</Link>
            )}
          </div>
        </div>
      </header>

      {/* Job Details Content */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Jobs
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{job.company} • {job.location}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-950/50 border border-gray-100 dark:border-gray-800 text-sm">
            <div>
              <p className="text-xs text-gray-400">JOB TYPE</p>
              <p className="font-semibold mt-0.5">{job.type}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">EXPERIENCE</p>
              <p className="font-semibold mt-0.5">{job.experience}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">SALARY</p>
              <p className="font-semibold mt-0.5">{job.salary}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">CATEGORY</p>
              <p className="font-semibold mt-0.5">{job.category}</p>
            </div>
          </div>

          <h3 className="text-lg font-bold mb-2">Job Description</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{job.description}</p>

          {hasApplied ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 font-semibold text-sm border border-emerald-200 dark:border-emerald-900">
              <CheckCircle2 className="w-5 h-5" /> Applied Successfully
            </div>
          ) : (
            <button
              onClick={handleApply}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow transition cursor-pointer"
            >
              Apply Now
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
