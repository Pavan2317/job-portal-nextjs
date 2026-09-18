'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchExp, setSearchExp] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch('/api/jobs');
        if (res.ok) {
          const data = await res.json();
          setJobs(Array.isArray(data) ? data : (data.jobs || data.data || []));
        }
      } catch (error) {
        console.error('Failed to fetch jobs', error);
      }
    }
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchTitle) queryParams.append('title', searchTitle);
    if (searchExp) queryParams.append('experience', searchExp);
    if (searchLocation) queryParams.append('location', searchLocation);
    router.push(`/jobs?${queryParams.toString()}`);
  };

  const safeJobs = Array.isArray(jobs) ? jobs : [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Search Section */}
      <div className="text-center py-16 px-4 bg-white border-b border-gray-100">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Find your dream job now</h1>
        <p className="text-gray-600 mb-8">Explore thousands of job opportunities from top companies.</p>
        
        {/* Advanced Search Form */}
        <form onSubmit={handleSearch} className="max-w-4xl mx-auto bg-white p-4 rounded-xl shadow-md border border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
          <div className="text-left px-2">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Skills / Designation</label>
            <input 
              type="text" 
              placeholder="e.g. React Developer" 
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className="w-full focus:outline-none text-gray-700 text-sm"
            />
          </div>
          <div className="text-left px-2 border-t md:border-t-0 md:border-l border-gray-200 pt-2 md:pt-0">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Experience</label>
            <select 
              value={searchExp}
              onChange={(e) => setSearchExp(e.target.value)}
              className="w-full focus:outline-none text-gray-700 text-sm bg-transparent"
            >
              <option value="">Select Experience</option>
              <option value="Fresher">Fresher</option>
              <option value="1-3 years">1-3 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
          </div>
          <div className="text-left px-2 border-t md:border-t-0 md:border-l border-gray-200 pt-2 md:pt-0">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Location</label>
            <input 
              type="text" 
              placeholder="e.g. Bangalore" 
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full focus:outline-none text-gray-700 text-sm"
            />
          </div>
          <div>
            <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
              Search Jobs
            </button>
          </div>
        </form>

        {/* Popular Searches */}
        <div className="mt-6 flex flex-wrap justify-center items-center gap-2 text-sm text-gray-600">
          <span className="font-medium text-gray-800">Popular Searches:</span>
          {['React Developer', 'Java', 'Python', 'UI Designer', 'Full Stack', 'Data Analyst', 'DevOps', 'Remote Jobs'].map((tag) => (
            <span 
              key={tag} 
              onClick={() => router.push(`/jobs?title=${tag}`)}
              className="bg-gray-100 border border-gray-200 px-3 py-1 rounded-full shadow-xs hover:border-blue-500 hover:text-blue-600 cursor-pointer transition"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Featured Companies */}
      <div className="max-w-6xl mx-auto px-4 py-10 w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Companies</h2>
        {safeJobs.length === 0 ? (
          <p className="text-gray-500 text-sm">No companies found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from(new Set(safeJobs.map(j => j.company).filter(Boolean))).slice(0, 4).map((compName, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{compName}</h3>
                    <span className="text-amber-500 text-sm font-medium">★ 4.5 rating</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">Leading organization currently hiring active professionals.</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">Active Openings</span>
                  <button 
                    onClick={() => router.push(`/jobs?company=${encodeURIComponent(compName)}`)}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                  >
                    View Jobs
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popular Job Categories with Accurate SVGs */}
      <div className="max-w-6xl mx-auto px-4 py-10 w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Popular Job Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { 
              title: 'Software Engineer', 
              count: '1,250 jobs available', 
              svg: <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
            },
            { 
              title: 'Frontend Developer', 
              count: '890 jobs available', 
              svg: <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" /></svg>
            },
            { 
              title: 'Backend Developer', 
              count: '750 jobs available', 
              svg: <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
            },
            { 
              title: 'Full Stack', 
              count: '620 jobs available', 
              svg: <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
            },
            { 
              title: 'Data Scientist', 
              count: '480 jobs available', 
              svg: <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
            },
            { 
              title: 'UI UX Designer', 
              count: '350 jobs available', 
              svg: <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>
            },
            { 
              title: 'Cloud Engineer', 
              count: '510 jobs available', 
              svg: <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg>
            },
            { 
              title: 'DevOps Engineer', 
              count: '380 jobs available', 
              svg: <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
            },
          ].map((cat, idx) => (
            <div 
              key={idx} 
              onClick={() => router.push(`/jobs?title=${encodeURIComponent(cat.title)}`)}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col items-center text-center"
            >
              <div className="mb-3 p-3 bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center">
                {cat.svg}
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-1">{cat.title}</h3>
              <p className="text-sm text-gray-500">{cat.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Jobs */}
      <div className="max-w-6xl mx-auto px-4 py-10 w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Jobs</h2>
          <a href="/jobs" className="text-blue-600 hover:underline text-sm font-medium">View All Jobs →</a>
        </div>
        {safeJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safeJobs.slice(0, 2).map((job) => (
              <div key={job._id || job.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{job.company}</p>
                  <div className="flex gap-4 text-xs text-gray-500 mb-4">
                    <span>📍 {job.location}</span>
                    <span>💼 {job.jobType || 'Full-time'}</span>
                  </div>
                </div>
                <button 
                  onClick={() => router.push(`/jobs/${job._id || job.id}`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition self-start"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No featured job postings found.</p>
        )}
      </div>

      {/* Top Hiring Companies Section */}
      <div className="max-w-6xl mx-auto px-4 py-10 w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Top Hiring Companies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'Google', rating: '4.8 rating', desc: 'Google is a multinational technology company specializing in internet-related services.', jobs: '125 current job openings' },
            { name: 'Microsoft', rating: '4.7 rating', desc: 'Microsoft develops, manufactures, licenses, supports, and sells computer software.', jobs: '98 current job openings' },
            { name: 'Amazon', rating: '4.5 rating', desc: 'Amazon is an American multinational technology company focusing on e-commerce & cloud.', jobs: '210 current job openings' },
            { name: 'Infosys', rating: '4.3 rating', desc: 'Infosys is an Indian multinational information technology company.', jobs: '75 current job openings' },
          ].map((comp, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{comp.name}</h3>
                  <span className="text-amber-500 text-sm font-medium">★ {comp.rating}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{comp.desc}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">{comp.jobs}</span>
                <button 
                  onClick={() => router.push(`/jobs?company=${encodeURIComponent(comp.name)}`)}
                  className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  View Jobs
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What Our Users Say */}
      <div className="bg-gray-100 py-16 mt-8">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'David Wilson', role: 'Backend Engineer at Infosys', text: '"Excellent experience! The application process was smooth and recruiter communication was quick."' },
              { name: 'Sarah Johnson', role: 'Software Engineer at Google', text: '"This job portal helped me find my dream job at Google. The platform is user-friendly and has a wide range of opportunities from top companies."' },
              { name: 'Michael Chen', role: 'Product Manager at Microsoft', text: '"I was able to connect with the right recruiters and land a fantastic position. The search filters and company profiles are very helpful."' },
            ].map((review, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-900">{review.name}</h4>
                <p className="text-xs text-blue-600 mb-3">{review.role}</p>
                <p className="text-gray-600 text-sm italic">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile App Banner */}
      <div className="bg-blue-600 py-12 text-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Search jobs anytime, anywhere</h2>
            <p className="text-blue-100 mb-6">Download our mobile app and find your dream job on the go.</p>
            <div className="flex gap-4">
              <button className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-900 transition">Download on App Store</button>
              <button className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-900 transition">Get it on Google Play</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Press</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/jobs" className="hover:text-white">Jobs</a></li>
              <li><a href="#" className="hover:text-white">Courses</a></li>
              <li><a href="#" className="hover:text-white">Resume Writing</a></li>
              <li><a href="#" className="hover:text-white">Premium</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4 text-sm">
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">Facebook</a>
              <a href="#" className="hover:text-white">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 pt-8 border-t border-gray-800 text-center text-xs">
          © 2026 JobPortal. All rights reserved.
        </div>
      </footer>
    </div>
  );
}