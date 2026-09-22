'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon, PlusCircle, LogOut, Briefcase, Users } from 'lucide-react';

export default function CompanyDashboard() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(savedUser);

    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    if (savedUser?.id) {
      fetchDashboardData(savedUser.id);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchDashboardData = async (companyId) => {
    try {
      setLoading(true);

      const [jobsResponse, applicationsResponse] = await Promise.all([
        fetch(`/api/jobs?companyId=${encodeURIComponent(companyId)}`),
        fetch(`/api/applications?companyId=${encodeURIComponent(companyId)}`)
      ]);

      const jobsResult = await jobsResponse.json();
      const applicationsResult = await applicationsResponse.json();

      if (jobsResult.success) {
        setJobs(jobsResult.data || []);
      } else {
        setJobs([]);
      }

      if (applicationsResult.success) {
        setApplications(applicationsResult.applications || []);
      } else {
        setApplications([]);
      }
    } catch (error) {
      console.error('Dashboard Data Error:', error);
      setJobs([]);
      setApplications([]);
    } finally {
      setLoading(false);
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to update application status');
      }

      if (user?.id) {
        await fetchDashboardData(user.id);
      }
    } catch (error) {
      console.error('Status Update Error:', error);
      alert(error.message);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400';
      case 'rejected':
        return 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400';
      case 'reviewing':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400';
      default:
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      case 'reviewing':
        return 'Reviewing';
      default:
        return 'Pending';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">

      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          <Link
            href="/"
            className="text-xl font-extrabold text-blue-600 dark:text-blue-500"
          >
            JobPortal
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>

            <Link href="/companies" className="hover:text-blue-600">
              Companies
            </Link>

            <Link href="/jobs" className="hover:text-blue-600">
              Jobs
            </Link>

            <Link
              href="/dashboard/company"
              className="text-blue-600 dark:text-blue-500 font-semibold"
            >
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center gap-4">

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition cursor-pointer"
              title="Toggle Dark/Light Mode"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-gray-700" />
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">
                  Welcome, {user.name || 'User'}
                </span>

                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-600 hover:underline cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium hover:text-blue-600"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow transition"
                >
                  Register
                </Link>
              </div>
            )}

          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Company Dashboard
            </h1>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage your job postings and review candidate applications
            </p>
          </div>

          <div className="flex items-center gap-3">

            <Link
              href="/dashboard/company/post-job"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Post New Job
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-50 hover:bg-red-100 dark:bg-red-950/40 text-red-600 text-sm font-medium px-4 py-2.5 rounded-xl transition flex items-center gap-2 border border-red-200 dark:border-red-900"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Jobs Posted
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {loading ? '...' : jobs.length}
                </h3>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>

            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Candidate Applications
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {loading ? '...' : applications.length}
                </h3>
              </div>

              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/40">
                <Users className="w-6 h-6 text-green-600" />
              </div>

            </div>
          </div>

        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">

          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold">
              Candidate Applications
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Candidates who applied to your job postings
            </p>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50 dark:bg-gray-950/50">

                <tr className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">

                  <th className="px-6 py-4">
                    Candidate
                  </th>

                  <th className="px-6 py-4">
                    Job
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">

                {loading ? (

                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      Loading applications...
                    </td>
                  </tr>

                ) : applications.length === 0 ? (

                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-10 text-center text-gray-500 dark:text-gray-400"
                    >
                      No candidates have applied to your jobs yet.
                    </td>
                  </tr>

                ) : (

                  applications.map((application) => (

                    <tr
                      key={application._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-950/40"
                    >

                      <td className="px-6 py-4">

                        <p className="font-medium">
                          {application.candidateName || 'Candidate'}
                        </p>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {application.candidateEmail ||
                            application.email ||
                            'No email'}
                        </p>

                      </td>

                      <td className="px-6 py-4">

                        <p className="font-medium">
                          {application.jobTitle || 'Job'}
                        </p>

                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                            application.status
                          )}`}
                        >
                          {getStatusLabel(application.status)}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex flex-wrap gap-2">

                          <button
                            onClick={() =>
                              updateApplicationStatus(
                                application._id,
                                'reviewing'
                              )
                            }
                            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400"
                          >
                            Reviewing
                          </button>

                          <button
                            onClick={() =>
                              updateApplicationStatus(
                                application._id,
                                'accepted'
                              )
                            }
                            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-950/40 dark:text-green-400"
                          >
                            Accept
                          </button>

                          <button
                            onClick={() =>
                              updateApplicationStatus(
                                application._id,
                                'rejected'
                              )
                            }
                            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400"
                          >
                            Reject
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>
        </div>

      </main>
    </div>
  );
}
