'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [isDark, setIsDark] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const lowerEmail = email.toLowerCase().trim();
    
    // Check registered user database
    const usersDb = JSON.parse(localStorage.getItem('registered_users_db') || '{}');
    let userRecord = usersDb[lowerEmail];

    let role = 'candidate';
    let name = 'User';

    if (userRecord) {
      role = userRecord.role;
      name = userRecord.name;
    } else {
      // Fallback if logged in with email not explicitly registered through form
      const registeredCompanies = JSON.parse(localStorage.getItem('registered_companies') || '[]');
      const isRegisteredCompany = registeredCompanies.includes(lowerEmail);
      const isKeywordCompany = 
        lowerEmail.includes('company') || 
        lowerEmail.includes('hr') || 
        lowerEmail.includes('tcs') || 
        lowerEmail.includes('google') || 
        lowerEmail.includes('employer') ||
        lowerEmail.includes('microsoft') ||
        lowerEmail.includes('infosys');

      role = (isRegisteredCompany || isKeywordCompany) ? 'company' : 'candidate';
      name = lowerEmail.split('@')[0];
      // Capitalize first letter
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }

    const userData = { name, email: lowerEmail, role };
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

      {/* Login Card Container */}
      <div className="flex-grow flex items-center justify-center p-6">
        <div className={`max-w-md w-full p-8 sm:p-10 rounded-3xl border shadow-sm ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          
          <h1 className="text-3xl font-extrabold text-center mb-8 tracking-tight">Login</h1>

          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-950 text-red-600 text-xs font-semibold px-4 py-3 rounded-xl border border-red-200 dark:border-red-900">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-gray-500">Email address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
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

            <div className="flex justify-between items-center text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-gray-500">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-blue-600 font-semibold hover:underline">Forgot your password?</a>
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-md"
            >
              Sign in
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-8">
            Don&apos;t have an account?{' '}
            <a href="/register" className="text-blue-600 font-semibold hover:underline">
              Register here
            </a>
          </p>

        </div>
      </div>

    </div>
  );
}