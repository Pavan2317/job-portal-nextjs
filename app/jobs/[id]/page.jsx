'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function JobDetailsPage() {
  const params = useParams();
  const jobId = params?.id;

  const [job, setJob] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('User data error:', err);
      }
    }

    if (jobId) {
      loadJob();
    }
  }, [jobId]);

  useEffect(() => {
    if (jobId && user?.id) {
      checkApplication(user);
    }
  }, [jobId, user]);

  const loadJob = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/jobs/${jobId}`, {
        cache: 'no-store'
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Job not found');
      }

      setJob(data.data);
    } catch (err) {
      console.error('Job Loading Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkApplication = async (currentUser) => {
    try {
      const response = await fetch(
        `/api/jobs/apply?jobId=${encodeURIComponent(jobId)}&userId=${encodeURIComponent(currentUser.id)}&email=${encodeURIComponent(currentUser.email || '')}`,
        {
          cache: 'no-store'
        }
      );

      const data = await response.json();

      if (data.success && data.applied) {
        setHasApplied(true);
      }
    } catch (err) {
      console.error('Application Check Error:', err);
    }
  };

  const handleApply = async () => {
    if (applying || hasApplied) {
      return;
    }

    if (!user || !user.id) {
      alert('Please login as a candidate first.');
      return;
    }

    if (user.role !== 'candidate') {
      alert('Only candidates can apply for jobs.');
      return;
    }

    try {
      setApplying(true);

      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: user.id,
          candidateId: user.id,
          candidateName: user.name || '',
          candidateEmail: user.email || '',
          email: user.email || '',
          jobId: job._id,
          jobTitle: job.title,
          company: job.company,
          companyId: job.companyId || ''
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
          data.error ||
          'Failed to apply for job'
        );
      }

      setHasApplied(true);

      if (!data.alreadyApplied) {
        setShowPopup(true);
      }

    } catch (err) {
      console.error('Apply Error:', err);
      alert(err.message);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Loading job details...
        </p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 mb-4">
          {error || 'Job not found'}
        </p>

        <Link
          href="/jobs"
          className="text-blue-600 hover:underline"
        >
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center">

            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-xl font-bold mb-2">
              Application Submitted!
            </h2>

            <p className="text-gray-500 mb-6">
              Your application has been saved successfully.
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
            >
              OK
            </button>

          </div>
        </div>
      )}

      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          <Link
            href="/"
            className="text-xl font-extrabold text-blue-600"
          >
            JobPortal
          </Link>

          <nav className="flex items-center gap-6 text-sm">

            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>

            <Link href="/jobs" className="hover:text-blue-600">
              Jobs
            </Link>

            <Link href="/companies" className="hover:text-blue-600">
              Companies
            </Link>

            {user && (
              <Link
                href={
                  user.role === 'company'
                    ? '/dashboard/company'
                    : '/dashboard/candidate'
                }
                className="font-semibold text-blue-600"
              >
                Dashboard
              </Link>
            )}

          </nav>

          {user ? (
            <span className="text-sm font-medium">
              Welcome, {user.name}
            </span>
          ) : (
            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Login
            </Link>
          )}

        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">

        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-blue-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </Link>

        <div className="bg-white rounded-2xl border shadow-sm p-8">

          <h1 className="text-3xl font-bold">
            {job.title}
          </h1>

          <p className="text-blue-600 font-semibold mt-2">
            {job.company}
          </p>

          <p className="text-gray-500 mt-2">
            📍 {job.location}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-7 p-5 bg-gray-50 rounded-xl">

            <div>
              <p className="text-xs text-gray-400">
                JOB TYPE
              </p>
              <p className="font-semibold mt-1">
                {job.type || 'Full-time'}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                EXPERIENCE
              </p>
              <p className="font-semibold mt-1">
                {job.experience || 'Not specified'}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                SALARY
              </p>
              <p className="font-semibold mt-1">
                {job.salary || 'Not specified'}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                CATEGORY
              </p>
              <p className="font-semibold mt-1">
                {job.category || 'General'}
              </p>
            </div>

          </div>

          <h2 className="text-xl font-bold mb-3">
            Job Description
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            {job.description || 'No description provided.'}
          </p>

          {job.skills && (
            <>
              <h2 className="text-xl font-bold mb-3">
                Skills
              </h2>

              <p className="text-gray-600 mb-8">
                {job.skills}
              </p>
            </>
          )}

          {hasApplied ? (

            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-50 text-green-700 font-semibold border border-green-200">
              <CheckCircle2 className="w-5 h-5" />
              Applied
            </div>

          ) : (

            <button
              onClick={handleApply}
              disabled={applying}
              className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50"
            >
              {applying ? 'Applying...' : 'Apply Now'}
            </button>

          )}

        </div>

      </main>
    </div>
  );
}
