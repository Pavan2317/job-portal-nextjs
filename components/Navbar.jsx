'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // పేజీ మారినప్పుడు లేదా లోడ్ అయినప్పుడు localStorage నుండి యూజర్ డేటాను వెతుకుతుంది
    const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-extrabold text-blue-600 dark:text-blue-500">
          JobPortal
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/jobs" className="hover:text-blue-600">Jobs</Link>
          <Link href="/companies" className="hover:text-blue-600">Companies</Link>
          {user && <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>}
        </nav>
        
        <div className="flex items-center gap-4">
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
  );
}
