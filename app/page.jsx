'use client';

import Link from 'next/link';
import { 
  Briefcase, Code, Palette, Server, Layers, BarChart, Cloud, RefreshCw, 
  Search, MapPin, Star, ChevronRight, Building2, Globe, Smartphone, Download, Share2,
  ChevronDown, Moon, Sun, LogOut
} from 'lucide-react';

export default function Home() {
  const popularSearches = [
    "React Developer", "Java", "Python", "UI Designer", 
    "Full Stack", "Data Analyst", "DevOps", "Remote Jobs"
  ];

  const categories = [
    { title: "Software Engineer", count: "1250 jobs available", icon: <Code className="w-8 h-8 text-blue-600" /> },
    { title: "Frontend Developer", count: "890 jobs available", icon: <Palette className="w-8 h-8 text-pink-500" /> },
    { title: "Backend Developer", count: "750 jobs available", icon: <Server className="w-8 h-8 text-purple-600" /> },
    { title: "Full Stack", count: "620 jobs available", icon: <Layers className="w-8 h-8 text-indigo-600" /> },
    { title: "Data Scientist", count: "480 jobs available", icon: <BarChart className="w-8 h-8 text-green-600" /> },
    { title: "UI UX Designer", count: "350 jobs available", icon: <Palette className="w-8 h-8 text-orange-500" /> },
    { title: "Cloud Engineer", count: "510 jobs available", icon: <Cloud className="w-8 h-8 text-sky-500" /> },
    { title: "DevOps Engineer", count: "380 jobs available", icon: <RefreshCw className="w-8 h-8 text-blue-500" /> },
  ];

  const companies = [
    { name: "Google", rating: "4.8", desc: "Google is a multinational technology company specializing in Internet-related services and products.", openings: "125 current job openings" },
    { name: "Microsoft", rating: "4.7", desc: "Microsoft develops, manufactures, licenses, supports, and sells computer software, consumer electronics, and personal computers.", openings: "98 current job openings" },
    { name: "Amazon", rating: "4.5", desc: "Amazon is an American multinational technology company focusing on e-commerce, cloud computing, and artificial intelligence.", openings: "210 current job openings" },
    { name: "Infosys", rating: "4.3", desc: "Infosys is an Indian multinational information technology company that provides business consulting, information technology and outsourcing services.", openings: "75 current job openings" },
  ];

  const testimonials = [
    { name: "Sarah Johnson", role: "Software Engineer at Google", text: "This job portal helped me find my dream job at Google. The platform is user-friendly and has a wide range of opportunities from top companies." },
    { name: "Michael Chen", role: "Product Manager at Microsoft", text: "I was able to connect with the right recruiters and land a fantastic position. The search filters and company profiles are very helpful." },
    { name: "Priya Patel", role: "UI/UX Designer at Adobe", text: "As a designer, I found the platform extremely useful for discovering creative roles. The application process was smooth and efficient." },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
              JobPortal
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
              <Link href="/" className="text-gray-900 hover:text-blue-600">Home</Link>
              <Link href="/jobs" className="hover:text-blue-600">Jobs</Link>
              <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle Switch */}
            <div className="flex items-center bg-gray-100 p-1 rounded-full cursor-pointer">
              <div className="w-7 h-7 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-700">
                <Sun className="w-4 h-4" />
              </div>
              <div className="w-7 h-7 flex items-center justify-center text-gray-400">
                <Moon className="w-4 h-4" />
              </div>
            </div>

            <span className="text-sm font-medium text-gray-700 hidden sm:inline">Welcome, Pavani</span>
            <button className="text-sm font-medium text-gray-600 hover:text-red-600 transition flex items-center space-x-1">
              <span>Logout</span>
            </button>

            <div className="hidden sm:flex items-center text-sm font-medium text-gray-700 cursor-pointer border-l pl-4 border-gray-200">
              <span>For Employers</span>
              <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      {/* 1. Hero Section */}
      <section className="py-16 px-4 text-center max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
          Find your dream job now
        </h1>
        <p className="text-base md:text-lg text-gray-500 mb-10">
          Explore thousands of job opportunities from top companies
        </p>

        {/* Search Box Card */}
        <div className="bg-white shadow-xl rounded-2xl p-4 md:p-6 border border-gray-100 flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 w-full text-left">
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Skills / Designation</label>
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5">
              <input type="text" placeholder="e.g. React Developer" className="w-full focus:outline-none text-sm text-gray-700 placeholder-gray-400" />
            </div>
          </div>

          <div className="flex-1 w-full text-left">
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Experience</label>
            <select className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 bg-white focus:outline-none text-sm text-gray-700">
              <option>Select Experience</option>
              <option>Fresher</option>
              <option>1-2 Years</option>
              <option>3-5 Years</option>
              <option>5+ Years</option>
            </select>
          </div>

          <div className="flex-1 w-full text-left">
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">Location</label>
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5">
              <input type="text" placeholder="e.g. Bangalore" className="w-full focus:outline-none text-sm text-gray-700 placeholder-gray-400" />
            </div>
          </div>

          <div className="w-full md:w-auto mt-auto">
            <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors shadow-md text-sm">
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      {/* 2. Popular Searches */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Searches</h2>
        <div className="flex flex-wrap gap-3">
          {popularSearches.map((tag, idx) => (
            <span key={idx} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* 3. Featured Companies */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Companies</h2>
        <p className="text-sm text-gray-500">No companies found.</p>
      </section>

      {/* 4. Popular Job Categories */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Popular Job Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white border border-gray-100 shadow-sm hover:shadow-md rounded-xl p-6 text-center transition">
              <div className="flex justify-center mb-4">{cat.icon}</div>
              <h3 className="font-semibold text-lg text-gray-900 mb-1">{cat.title}</h3>
              <p className="text-sm text-gray-500">{cat.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Featured Jobs */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Jobs</h2>
          <Link href="/jobs" className="text-blue-600 hover:underline font-medium text-sm flex items-center">
            View All Jobs <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-1">React Frontend Developer</h3>
            <p className="text-sm text-gray-600 mb-4">Tata Consultancy Services (TCS)</p>
            <div className="flex justify-between text-xs text-gray-500 mb-6">
              <span>Hyderabad</span>
              <span>Full-time</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
              View Details
            </button>
          </div>
        </div>
      </section>

      {/* 6. Top Hiring Companies */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Top Hiring Companies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companies.map((comp, idx) => (
            <div key={idx} className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{comp.name}</h3>
                  <span className="flex items-center text-sm font-semibold text-amber-500 bg-amber-50 px-2.5 py-0.5 rounded">
                    <Star className="w-4 h-4 fill-current mr-1" /> {comp.rating} rating
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{comp.desc}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-xs font-medium text-gray-500">{comp.openings}</span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
                  View Jobs
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. What Our Users Say */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-700 mr-3">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{t.name}</h4>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">"{t.text}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Mobile App Promo Banner */}
      <section className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-xl mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Search jobs anytime, anywhere</h2>
            <p className="text-blue-100 mb-6">Download our mobile app and find your dream job on the go.</p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg flex items-center space-x-2 text-sm font-medium transition">
                <Download className="w-5 h-5" />
                <span>Download on App Store</span>
              </button>
              <button className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg flex items-center space-x-2 text-sm font-medium transition">
                <Smartphone className="w-5 h-5" />
                <span>Get it on Google Play</span>
              </button>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl text-gray-800">
            <div className="w-24 h-24 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
              <Briefcase className="w-12 h-12 text-blue-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/jobs" className="hover:text-white transition">Jobs</Link></li>
              <li><Link href="/courses" className="hover:text-white transition">Courses</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="hover:text-white transition">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <span className="cursor-pointer hover:text-white transition"><Globe className="w-5 h-5" /></span>
              <span className="cursor-pointer hover:text-white transition"><Share2 className="w-5 h-5" /></span>
              <span className="cursor-pointer hover:text-white transition"><Smartphone className="w-5 h-5" /></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
