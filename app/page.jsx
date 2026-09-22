'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Briefcase, Building2, Sun, Moon, Star, ArrowRight, CheckCircle, Smartphone, MapPin } from 'lucide-react';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchExperience, setSearchExperience] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';

    setDarkMode(isDark);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(savedUser);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const popularSearches = ['React Developer', 'Java', 'Python', 'UI Designer', 'Full Stack', 'Data Analyst', 'DevOps', 'Remote Jobs'];

  const categories = [
    { title: 'Software Engineer', count: '1250 jobs available' },
    { title: 'Frontend Developer', count: '890 jobs available' },
    { title: 'Backend Developer', count: '750 jobs available' },
    { title: 'Full Stack', count: '620 jobs available' },
    { title: 'Data Scientist', count: '480 jobs available' },
    { title: 'UI/UX Designer', count: '350 jobs available' },
    { title: 'Cloud Engineer', count: '510 jobs available' },
    { title: 'DevOps Engineer', count: '380 jobs available' },
  ];

  const topCompanies = [
    { name: 'Google', rating: '4.8', desc: 'Google is a multinational technology company specializing in Internet-related services and products.', openings: '125 current job openings' },
    { name: 'Microsoft', rating: '4.7', desc: 'Microsoft develops, manufactures, licenses, supports, and sells computer software, consumer electronics, and personal computers.', openings: '98 current job openings' },
    { name: 'Amazon', rating: '4.5', desc: 'Amazon is an American multinational technology company focusing on e-commerce, cloud computing, and artificial intelligence.', openings: '210 current job openings' },
    { name: 'Infosys', rating: '4.3', desc: 'Infosys is an Indian multinational information technology company that provides business consulting, information technology and outsourcing services.', openings: '75 current job openings' },
  ];

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Software Engineer at Google', text: '"This job portal helped me find my dream job at Google. The platform is user-friendly and has a wide range of opportunities from top companies."' },
    { name: 'Michael Chen', role: 'Product Manager at Microsoft', text: '"I was able to connect with the right recruiters and land a fantastic position. The search filters and company profiles are very helpful."' },
    { name: 'Priya Patel', role: 'UI/UX Designer at Adobe', text: '"As a designer, I found the platform extremely useful for discovering creative roles. The application process was smooth and efficient."' },
  ];

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
            <Link href="/jobs" className="hover:text-blue-600">Jobs</Link>
            <Link href="/companies" className="hover:text-blue-600">Companies</Link>
            {user && <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>}
          </nav>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Welcome, {user.name || 'User'}</span>
                <button 
                  onClick={() => { localStorage.removeItem('user'); setUser(null); }}
                  className="text-sm font-medium text-red-600 hover:underline"
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

      {/* Hero Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto text-center relative">

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md transition"
          >
            {darkMode ? (
              <>
                <Sun className="w-5 h-5" />
                White Mode
              </>
            ) : (
              <>
                <Moon className="w-5 h-5" />
                Dark Mode
              </>
            )}
          </button>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Find your dream job now
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-10">
          Explore thousands of job opportunities from top companies
        </p>

        {/* Search Bar Box with Experience Dropdown */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm max-w-5xl mx-auto flex flex-col md:flex-row gap-3 items-center mb-6">
          <div className="w-full flex-1 text-left px-3 py-2 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Skills / Designation</label>
            <input 
              type="text" 
              placeholder="e.g. React Developer" 
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
          <div className="w-full flex-1 text-left px-3 py-2 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Experience</label>
            <select 
              value={searchExperience}
              onChange={(e) => setSearchExperience(e.target.value)}
              className="w-full bg-transparent outline-none text-sm cursor-pointer"
            >
              <option value="">Select Experience</option>
              <option value="Fresher">Fresher (0-1 Years)</option>
              <option value="1-3 Years">1-3 Years</option>
              <option value="3-5 Years">3-5 Years</option>
              <option value="5+ Years">5+ Years</option>
            </select>
          </div>
          <div className="w-full flex-1 text-left px-3 py-2">
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Location</label>
            <input 
              type="text" 
              placeholder="e.g. Bangalore" 
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
          <Link 
            href={`/jobs?title=${searchTitle}&exp=${searchExperience}&location=${searchLocation}`}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl transition shadow flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" /> Search Jobs
          </Link>
        </div>

        {/* Popular Searches Tags */}
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-gray-500 font-medium mr-2">Popular Searches:</span>
          {popularSearches.map((tag, idx) => (
            <Link 
              key={idx} 
              href={`/jobs?title=${tag}`}
              className="px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-gray-600 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 transition shadow-xs"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Job Categories */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Popular Job Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link href={`/jobs?category=${cat.title}`} key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:border-blue-500 transition text-center block">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/50 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-1">{cat.title}</h3>
              <p className="text-xs text-gray-500">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Jobs</h2>
          <Link href="/jobs" className="text-blue-600 font-medium hover:underline flex items-center gap-1">
            View All Jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-1">React Frontend Developer</h3>
              <p className="text-sm text-gray-500 mb-4">Tata Consultancy Services (TCS)</p>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Hyderabad</span>
                <span className="bg-blue-50 dark:bg-blue-950/50 text-blue-600 px-2.5 py-1 rounded-md font-medium">Full-time</span>
              </div>
            </div>
            <Link href="/jobs" className="bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-2 rounded-xl transition">
              View Details
            </Link>
          </div>
        </div>
      </section>

      {/* Top Hiring Companies */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Top Hiring Companies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topCompanies.map((comp, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">{comp.name}</h3>
                  <span className="flex items-center gap-1 text-amber-500 text-sm font-semibold bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg">
                    <Star className="w-4 h-4 fill-amber-500" /> {comp.rating} rating
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{comp.desc}</p>
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <span className="text-xs text-gray-500 font-medium">{comp.openings}</span>
                <Link href="/jobs" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition">
                  View Jobs
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-300 italic mb-6">{t.text}</p>
              <div>
                <h4 className="font-bold text-sm">{t.name}</h4>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile App Download Banner */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/50 px-3 py-1 rounded-full text-xs font-semibold mb-4">
              <Smartphone className="w-3.5 h-3.5" /> Mobile App Available
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Search jobs anytime, anywhere</h2>
            <p className="text-blue-100 max-w-lg mb-6">Download our mobile app and find your dream job on the go with instant notifications.</p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-black hover:bg-gray-900 text-white font-medium px-6 py-3 rounded-xl transition shadow">
                Download on App Store
              </button>
              <button className="bg-black hover:bg-gray-900 text-white font-medium px-6 py-3 rounded-xl transition shadow">
                Get it on Google Play
              </button>
            </div>
          </div>
          <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
            <Smartphone className="w-16 h-16 text-white" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/jobs" className="hover:text-white">Jobs</Link></li>
              <li><Link href="/courses" className="hover:text-white">Courses</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4 text-sm">
              <a href="#" className="hover:text-white">Facebook</a>
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-xs text-center">
          &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
        </div>
      </footer>
    </div>
  );
}




