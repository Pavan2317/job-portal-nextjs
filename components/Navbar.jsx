'use client';

import React from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  const renderAuthButtons = () => {
    if (!user) {
      return (
        <div className="flex items-center space-x-3">
          <Link href="/login" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 text-sm font-medium">Login</Link>
          <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">Register</Link>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">Welcome</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white hover:bg-red-600 px-3 py-1.5 rounded-md text-sm font-medium transition"
        >
          Logout
        </button>
      </div>
    );
  };

  const renderNavigationLinks = () => {
    if (!user) {
      return (
        <>
          <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 text-sm font-medium">Home</Link>
          <Link href="/jobs" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 text-sm font-medium">Jobs</Link>
          <Link href="/companies" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 text-sm font-medium">Companies</Link>
        </>
      );
    }

    if (user.role === 'candidate') {
      return (
        <>
          <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 text-sm font-medium">Home</Link>
          <Link href="/jobs" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 text-sm font-medium">Jobs</Link>
          <Link href="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 text-sm font-medium">Dashboard</Link>
        </>
      );
    }

    if (user.role === 'company') {
      return (
        <>
          <Link href="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 text-sm font-medium">Dashboard</Link>
          <Link href="/jobs-list" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 text-sm font-medium">Jobs</Link>
          <Link href="/applications" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 text-sm font-medium">Applications</Link>
        </>
      );
    }

    if (user.role === 'admin') {
      return (
        <>
          <Link href="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 text-sm font-medium">Dashboard</Link>
          <Link href="/jobs-list" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 text-sm font-medium">Jobs</Link>
          <Link href="/companies" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 text-sm font-medium">Companies</Link>
          <Link href="/applications" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 px-3 py-2 text-sm font-medium">Applications</Link>
        </>
      );
    }

    return null;
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-white">JobPortal</h1>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            {renderNavigationLinks()}
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {renderAuthButtons()}
          </div>
        </div>
      </div>
    </nav>
  );
}

