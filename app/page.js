'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Load jobs from localStorage or fallback
    const defaultJobs = [
      { id: 1, title: 'React Frontend Developer', company: 'Tata Consultancy Services (TCS)', location: 'Hyderabad', type: 'Full-time', salary: '₹12 LPA' },
      { id: 2, title: 'Backend Engineer', company: 'Google', location: 'Bangalore', type: 'Full-time', salary: '₹24 LPA' },
      { id: 3, title: 'UI UX Designer', company: 'Microsoft', location: 'Remote', type: 'Full-time', salary: '₹15 LPA' }
    ];
    const saved = localStorage.getItem('company_jobs');
    if (saved) {
      try {
        setJobs(JSON.parse(saved));
      } catch (e) {
        setJobs(defaultJobs);
      }
    } else {
      setJobs(defaultJobs);
    }

    return () => observer.disconnect();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/jobs?title=${encodeURIComponent(searchTitle)}&location=${encodeURIComponent(searchLocation)}`);
  };

  const categories = [
    { title: 'Software Engineer', count: '1250 jobs available', icon: '💻' },
    { title: 'Frontend Developer', count: '890 jobs available', icon: '🎨' },
    { title: 'Backend Developer', count: '750 jobs available', icon: '🛠️' },
    { title: 'Full Stack', count: '620 jobs available', icon: '⚡' },
    { title: 'Data Scientist', count: '480 jobs available', icon: '📊' },
    { title: 'UI UX Designer', count: '350 jobs available', icon: '✨' },
    { title: 'Cloud Engineer', count: '510 jobs available', icon: '☁️' },
    { title: 'DevOps Engineer', count: '380 jobs available', icon: '🔄' },
  ];

  const topCompanies = [
    { name: 'Google', rating: '4.8 rating', desc: 'Google is a multinational technology company specializing in Internet-related services.', openings: '125 current job openings' },
    { name: 'Microsoft', rating: '4.7 rating', desc: 'Microsoft develops, manufactures, licenses, supports, and sells computer software and personal computers.', openings: '98 current job openings' },
    { name: 'Amazon', rating: '4.5 rating', desc: 'Amazon focuses on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence.', openings: '210 current job openings' },
    { name: 'Infosys', rating: '4.3 rating', desc: 'Infosys is an Indian multinational IT company that provides business consulting and outsourcing services.', openings: '75 current job openings' },
  ];

  const testimonials = [
    { name: 'Ananya Reddy', role: 'Data Analyst at TCS', quote: 'The job recommendations matched my profile perfectly. I got my first job through this portal.' },
    { name: 'David Wilson', role: 'Backend Engineer at Infosys', quote: 'Excellent experience! The application process was smooth and recruiter communication was quick.' },
    { name: 'Sarah Johnson', role: 'Software Engineer at Google', quote: 'This job portal helped me find my dream job at Google. The platform is user-friendly and has a wide range of opportunities.' },
  ];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-gray-950 text-gray-100' : 'bg-white text-gray-900'}`}>
      
      {/* Navbar */}
      <nav className={`px-8 py-4 border-b flex justify-between items-center ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-8">
          <span className="font-extrabold text-xl text-blue-600 tracking-tight">JobPortal</span>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a href="/" className="text-blue-600">Home</a>
            <a href="/jobs" className="hover:text-blue-600 transition">Jobs</a>
            <a href="/products" className="hover:text-blue-600 transition">Products</a>
            <a href="/companies" className="hover:text-blue-600 transition">Companies</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="/login" className="text-xs font-semibold px-4 py-2 hover:text-blue-600">Login</a>
          <a href="/register" className="text-xs font-semibold px-4 py-2 bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-700 transition">Register</a>
        </div>
      </nav>

      {/* Hero Search Section */}
      <section className="py-16 px-6 text-center max-w-5xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">Find your dream job now</h1>
        <p className={`text-sm mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Explore thousands of job opportunities from top companies</p>

        <form onSubmit={handleSearch} className={`p-4 rounded-2xl border shadow-lg grid grid-cols-1 md:grid-cols-3 gap-3 items-center ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="text-left px-3">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Skills / Designation</label>
            <input 
              type="text" 
              placeholder="e.g. React Developer"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className="w-full text-sm bg-transparent outline-none"
            />
          </div>

          <div className="text-left px-3 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-800 pt-3 md:pt-0">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Location</label>
            <input 
              type="text" 
              placeholder="e.g. Bangalore"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full text-sm bg-transparent outline-none"
            />
          </div>

          <div className="p-1">
            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-md">
              Search Jobs
            </button>
          </div>
        </form>

        {/* Popular Searches */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-bold text-gray-400 mr-2">Popular Searches:</span>
          {['React Developer', 'Java', 'Python', 'UI Designer', 'Full Stack', 'Data Analyst', 'DevOps', 'Remote Jobs'].map((tag, i) => (
            <a key={i} href={`/jobs?title=${encodeURIComponent(tag)}`} className={`text-xs px-3 py-1.5 rounded-full border transition ${isDark ? 'bg-gray-900 border-gray-800 hover:border-blue-500' : 'bg-gray-50 border-gray-200 hover:border-blue-600'}`}>
              {tag}
            </a>
          ))}
        </div>
      </section>

      {/* Popular Job Categories */}
      <section className={`py-16 px-6 border-y ${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-extrabold text-center mb-10">Popular Job Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <div key={idx} className={`p-6 rounded-2xl border shadow-sm transition hover:-translate-y-1 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-base mb-1">{cat.title}</h3>
                <p className="text-xs text-gray-500">{cat.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 px-6 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-extrabold">Featured Jobs</h2>
          <a href="/jobs" className="text-xs font-bold text-blue-600 hover:underline">View All Jobs →</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.slice(0, 4).map((job) => (
            <div key={job.id} className={`p-6 rounded-2xl border shadow-sm flex flex-col justify-between ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <div>
                <h3 className="font-bold text-lg mb-1">{job.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{job.company} • {job.location}</p>
                <span className="text-[10px] font-semibold bg-blue-50 dark:bg-gray-800 text-blue-600 px-3 py-1 rounded-full">{job.type}</span>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <span className="text-xs font-bold text-green-600">{job.salary || 'Competitive'}</span>
                <a href="/jobs" className="text-xs font-semibold px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">View Details</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Hiring Companies */}
      <section className={`py-16 px-6 border-y ${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-extrabold text-center mb-10">Top Hiring Companies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topCompanies.map((comp, idx) => (
              <div key={idx} className={`p-6 rounded-2xl border shadow-sm flex flex-col justify-between ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{comp.name}</h3>
                    <span className="text-xs font-bold bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400 px-2.5 py-1 rounded-lg">⭐ {comp.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4 line-clamp-2">{comp.desc}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-800">
                  <span className="text-xs font-semibold text-blue-500">{comp.openings}</span>
                  <a href="/jobs" className="text-xs font-semibold px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">View Jobs</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl font-extrabold text-center mb-10">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className={`p-6 rounded-2xl border shadow-sm flex flex-col justify-between ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
              <p className="text-xs text-gray-600 dark:text-gray-300 italic mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <h4 className="font-bold text-sm">{t.name}</h4>
                <p className="text-[10px] text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile App Banner */}
      <section className="bg-blue-600 text-white py-12 px-6 my-10 max-w-6xl mx-auto w-full rounded-3xl flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="text-3xl font-extrabold mb-2">Search jobs anytime, anywhere</h2>
          <p className="text-blue-100 text-xs mb-6">Download our mobile app and find your dream job on the go.</p>
          <div className="flex gap-4">
            <button className="bg-black text-white px-5 py-2.5 rounded-xl text-xs font-semibold">Download on App Store</button>
            <button className="bg-black text-white px-5 py-2.5 rounded-xl text-xs font-semibold">Get it on Google Play</button>
          </div>
        </div>
        <div className="bg-white text-blue-600 p-8 rounded-2xl font-bold text-4xl shadow-xl">
          📱
        </div>
      </section>

      {/* Footer */}
      <footer className={`mt-auto border-t py-12 px-8 ${isDark ? 'bg-gray-900 border-gray-800 text-gray-400' : 'bg-gray-900 text-gray-400 border-gray-900'}`}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Press</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/jobs" className="hover:text-white transition">Jobs</a></li>
              <li><a href="/products" className="hover:text-white transition">Courses</a></li>
              <li><a href="#" className="hover:text-white transition">Resume Writing</a></li>
              <li><a href="#" className="hover:text-white transition">Premium</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Follow Us</h4>
            <div className="flex gap-4 text-sm">
              <a href="#" className="hover:text-white transition">Facebook</a>
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          © 2026 JobPortal. All rights reserved.
        </div>
      </footer>

    </div>
  );
}