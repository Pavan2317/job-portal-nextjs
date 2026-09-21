import Link from 'next/link';
import { Briefcase, MapPin, Building2, ArrowRight, Smartphone, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">
            Find your dream job now
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            Explore thousands of job opportunities from top companies
          </p>

          {/* Advanced Search Box */}
          <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="text-left">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Skills / Designation</label>
              <input 
                type="text" 
                placeholder="e.g. React Developer" 
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="text-left">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Experience</label>
              <select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600">
                <option>Select Experience</option>
                <option>0-1 Years</option>
                <option>1-3 Years</option>
                <option>3-5 Years</option>
                <option>5+ Years</option>
              </select>
            </div>
            <div className="text-left">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Location</label>
              <input 
                type="text" 
                placeholder="e.g. Bangalore" 
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="md:mt-5">
              <Link 
                href="/jobs" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition text-center block shadow-md"
              >
                Search Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Searches Section */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Popular Searches</h2>
        <div className="flex flex-wrap gap-3">
          {["React Developer", "Java", "Python", "UI Designer", "Full Stack", "Data Analyst", "DevOps", "Remote Jobs"].map((tag, idx) => (
            <Link key={idx} href="/jobs" className="bg-gray-100 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-950/50 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-800 transition">
              {tag}
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Job Categories */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Popular Job Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { title: "Software Engineer", jobs: "1250 jobs available" },
            { title: "Frontend Developer", jobs: "890 jobs available" },
            { title: "Backend Developer", jobs: "750 jobs available" },
            { title: "Full Stack", jobs: "620 jobs available" },
            { title: "Data Scientist", jobs: "480 jobs available" },
            { title: "UI UX Designer", jobs: "350 jobs available" },
            { title: "Cloud Engineer", jobs: "510 jobs available" },
            { title: "DevOps Engineer", jobs: "380 jobs available" },
          ].map((cat, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/50 rounded-xl mx-auto flex items-center justify-center mb-4 text-blue-600">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{cat.title}</h3>
              <p className="text-sm text-gray-500">{cat.jobs}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Jobs</h2>
          <Link href="/jobs" className="text-blue-600 hover:underline font-medium text-sm flex items-center">
            View All Jobs &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">React Frontend Developer</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Tata Consultancy Services (TCS)</p>
            <div className="flex justify-between text-sm text-gray-500 mb-6">
              <span>Hyderabad</span>
              <span>Full-time</span>
            </div>
            <Link href="/jobs/1" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl block text-center transition">
              View Details
            </Link>
          </div>
        </div>
      </section>

      {/* Top Hiring Companies */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Top Hiring Companies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: "Google", rating: "4.8 rating", desc: "Google is a multinational technology company specializing in Internet-related services and products.", openings: "125 current job openings" },
            { name: "Microsoft", rating: "4.7 rating", desc: "Microsoft develops, manufactures, licenses, supports, and sells computer software, consumer electronics, and personal computers.", openings: "98 current job openings" },
            { name: "Amazon", rating: "4.5 rating", desc: "Amazon is an American multinational technology company focusing on e-commerce, cloud computing, and artificial intelligence.", openings: "210 current job openings" },
            { name: "Infosys", rating: "4.3 rating", desc: "Infosys is an Indian multinational information technology company that provides business consulting, information technology and outsourcing services.", openings: "75 current job openings" },
          ].map((comp, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{comp.name}</h3>
                  <span className="text-amber-500 text-sm font-semibold flex items-center">&#9733; {comp.rating}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{comp.desc}</p>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <span className="text-xs text-gray-500 font-medium">{comp.openings}</span>
                <Link href="/companies" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition">
                  View Jobs
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What Our Users Say */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Sarah Johnson", role: "Software Engineer at Google", text: "This job portal helped me find my dream job at Google. The platform is user-friendly and has a wide range of opportunities from top companies." },
            { name: "Michael Chen", role: "Product Manager at Microsoft", text: "I was able to connect with the right recruiters and land a fantastic position. The search filters and company profiles are very helpful." },
            { name: "Priya Patel", role: "UI/UX Designer at Adobe", text: "As a designer, I found the platform extremely useful for discovering creative roles. The application process was smooth and efficient." },
          ].map((testi, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center font-bold justify-center text-blue-600">{testi.name[0]}</div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">{testi.name}</h4>
                  <p className="text-xs text-gray-500">{testi.role}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 italic">&ldquo;{testi.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-extrabold mb-3">Search jobs anytime, anywhere</h2>
            <p className="text-blue-100 mb-6 text-lg">Download our mobile app and find your dream job on the go.</p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-black text-white px-6 py-3 rounded-xl font-medium text-sm shadow-md">
                Download on App Store
              </button>
              <button className="bg-black text-white px-6 py-3 rounded-xl font-medium text-sm shadow-md">
                Get it on Google Play
              </button>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl text-blue-600">
            <Smartphone className="w-20 h-20 mx-auto" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
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
            <div className="flex space-x-4">
              <span className="cursor-pointer hover:text-white">Facebook</span>
              <span className="cursor-pointer hover:text-white">Twitter</span>
              <span className="cursor-pointer hover:text-white">LinkedIn</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}