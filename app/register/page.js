'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [isDark, setIsDark] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('candidate');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const lowerEmail = email.toLowerCase().trim();
    const trimmedName = name.trim();

    // Store user profile details in a dictionary database in localStorage
    const usersDb = JSON.parse(localStorage.getItem('registered_users_db') || '{}');
    usersDb[lowerEmail] = { name: trimmedName, email: lowerEmail, role };
    localStorage.setItem('registered_users_db', JSON.stringify(usersDb));

    // If registered as company, also track in registered_companies
    if (role === 'company') {
      const existingCompanies = JSON.parse(localStorage.getItem('registered_companies') || '[]');
      if (!existingCompanies.includes(lowerEmail)) {
        existingCompanies.push(lowerEmail);
        localStorage.setItem('registered_companies', JSON.stringify(existingCompanies));
      }
    }

    // Save active session
    const userData = { name: trimmedName, email: lowerEmail, role };
    localStorage.setItem('user_session', JSON.stringify(userData));

    if (role === 'company') {
      router.push('/dashboard/company');
    } else {
      router.push('/dashboard/candidate');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-gray-950 text-gray-100' : 'bg-gray-50/50 text-gray-900'}`}>
      
      {/* Navbar */}
      <nav className={`px-8 py-4 border-b flex justify-between items-center ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-8">
          <span className="font-extrabold text-xl text-blue-600 tracking-tight">JobPortal</span>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a href="/" className="hover:text-blue-600 transition">Home</a>
            <a href="/jobs" className="hover:text-blue-600 transition">Jobs</a>
            <a href="/products" className="hover:text-blue-600 transition">Products</a>
            <a href="/companies" className="hover:text-blue-600 transition">Companies</a>
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
          <a href="/login" className="text-xs font-semibold px-4 py-2 text-blue-600">Login</a>
          <a href="/register" className="text-xs font-semibold px-4 py-2 bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-700 transition">Register</a>
        </div>
      </nav>

      {/* Register Card Container */}
      <div className="flex-grow flex items-center justify-center p-6">
        <div className={`max-w-md w-full p-8 sm:p-10 rounded-3xl border shadow-sm ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          
          <h1 className="text-3xl font-extrabold text-center mb-8 tracking-tight">Create Account</h1>

          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-950 text-red-600 text-xs font-semibold px-4 py-3 rounded-xl border border-red-200 dark:border-red-900">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-gray-500">Full Name / Company Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe or Google Inc"
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                  isDark ? 'bg-gray-950 border-gray-800 text-white focus:border-blue-500' : 'bg-blue-50/30 border-blue-100 text-gray-900 focus:border-blue-600'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 text-gray-500">Email address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                  isDark ? 'bg-gray-950 border-gray-800 text-white focus:border-blue-500' : 'bg-blue-50/30 border-blue-100 text-gray-900 focus:border-blue-600'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 text-gray-500">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                  isDark ? 'bg-gray-950 border-gray-800 text-white focus:border-blue-500' : 'bg-blue-50/30 border-blue-100 text-gray-900 focus:border-blue-600'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 text-gray-500">I want to register as:</label>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition ${
                  isDark ? 'bg-gray-950 border-gray-800 text-white focus:border-blue-500' : 'bg-blue-50/30 border-blue-100 text-gray-900 focus:border-blue-600'
                }`}
              >
                <option value="candidate">Candidate (Looking for jobs)</option>
                <option value="company">Company / Employer (Posting jobs)</option>
              </select>
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-md mt-2"
            >
              Sign up
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 font-semibold hover:underline">
              Login here
            </a>
          </p>

        </div>
      </div>

    </div>
  );
}