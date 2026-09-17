'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    router.push('/login');
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b shadow-sm">
      <div className="flex items-center gap-10">
        <Link href="/" className="text-xl font-bold text-blue-600 tracking-tight">
          JobPortal
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/jobs" className="hover:text-blue-600 transition">Jobs</Link>
          <Link href="/products" className="hover:text-blue-600 transition">Products</Link>
          <Link href="/companies" className="hover:text-blue-600 transition">Companies</Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Dark/Light mode toggle switch */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition">
          <div className={`w-8 h-4 flex items-center rounded-full p-1 ${darkMode ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'}`}>
            <div className="bg-white w-3 h-3 rounded-full shadow-md"></div>
          </div>
        </button>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-700">Hello, {user.name}</span>
            <button 
              onClick={handleLogout}
              className="text-sm border border-red-500 text-red-500 px-4 py-1.5 rounded-lg hover:bg-red-50 transition">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 px-3 py-1.5">
              Login
            </Link>
            <Link href="/register" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Register
            </Link>
          </div>
        )}

        <div className="relative group">
          <button className="text-sm font-medium text-gray-700 flex items-center gap-1 px-3 py-1.5 border rounded-lg hover:bg-gray-50">
            For Employers ▾
          </button>
        </div>
      </div>
    </nav>
  );
}