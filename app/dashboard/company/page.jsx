'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon, Briefcase, Users, PlusCircle, LogOut } from 'lucide-react';

export default function CompanyDashboard() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

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
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Navigation Bar */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold text-blue-600 dark:text-blue-500">
            JobPortal
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/companies" className="hover:text-blue-600">Companies</Link>
            <Link href="/jobs" className="hover:text-blue-600">Jobs</Link>
            <Link href="/dashboard/company" className="text-blue-600 dark:text-blue-500 font-semibold">Dashboard</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition cursor-pointer"
              title="Toggle Dark/Light Mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-700" />}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Welcome, {user.name || 'User'}</span>
                <button 
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-600 hover:underline cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="px-4 py-2 text-sm font-medium hover:text-blue-600">Login</Link>
                <Link href="/register" className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow transition">Register</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Company Dashboard</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your job postings and review candidate applications</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm">
              <PlusCircle className="w-4 h-4" /> Post New Job
            </button>
            <button 
              onClick={handleLogout}
              className="bg-red-50 hover:bg-red-100 dark:bg-red-950/40 text-red-600 text-sm font-medium px-4 py-2.5 rounded-xl transition flex items-center gap-2 border border-red-200 dark:border-red-900"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/50 rounded-xl flex items-center justify-center text-blue-600">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Jobs Posted</p>
              <h3 className="text-2xl font-bold mt-1">1</h3>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/50 rounded-xl flex items-center justify-center text-amber-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Candidate Applications</p>
              <h3 className="text-2xl font-bold mt-1">2</h3>
            </div>
          </div>
        </div>

        {/* Candidate Applications Table */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-bold">Candidate Applications</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-400 uppercase bg-gray-50/50 dark:bg-gray-900/50">
                  <th className="p-4 pl-6">Candidate</th>
                  <th className="p-4">Job Role</th>
                  <th className="p-4">Current Status</th>
                  <th className="p-4 pr-6 text-right">Actions / Change Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-sm">
                <tr>
                  <td className="p-4 pl-6">
                    <p className="font-bold">John Doe</p>
                    <p className="text-xs text-gray-500">johndoe@example.com</p>
                  </td>
                  <td className="p-4">mern developer</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/50 text-red-600">
                      ✕ Rejected
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right space-x-2">
                    <button className="px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-600 font-medium rounded-lg text-xs transition">Reviewing</button>
                    <button className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 font-medium rounded-lg text-xs transition">Accept</button>
                    <button className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg text-xs transition">Reject</button>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 pl-6">
                    <p className="font-bold">Jane Smith</p>
                    <p className="text-xs text-gray-500">janesmith@example.com</p>
                  </td>
                  <td className="p-4">mern developer</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
                      ✓ Accepted
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right space-x-2">
                    <button className="px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-600 font-medium rounded-lg text-xs transition">Reviewing</button>
                    <button className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 font-medium rounded-lg text-xs transition">Accept</button>
                    <button className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg text-xs transition">Reject</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
