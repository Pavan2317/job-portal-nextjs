'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    router.push('/login');
  };

  if (!mounted) return null;

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100">
      <Link href="/" className="text-xl font-extrabold text-blue-600">JobPortal</Link>
      <div className="flex items-center space-x-6 text-sm font-medium">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <Link href="/jobs" className="hover:text-blue-600">Jobs</Link>
        <Link href="/companies" className="hover:text-blue-600">Companies</Link>
        <Link href="/dashboard/candidate" className="hover:text-blue-600">Dashboard</Link>
      </div>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/login" className="text-gray-700 dark:text-gray-300 font-medium">Login</Link>
            <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
