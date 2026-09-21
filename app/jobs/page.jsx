'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, MapPin, Briefcase, Building2, Filter } from 'lucide-react';

function JobsContent() {
  const searchParams = useSearchParams();
  const companyQuery = searchParams.get('company') || '';
  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || '';

  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [selectedCompany, setSelectedCompany] = useState(companyQuery);

  const allJobs = [
    { id: 1, title: "React Frontend Developer", company: "Tata Consultancy Services (TCS)", location: "Hyderabad", type: "Full-time", category: "Frontend Developer", exp: "1-2 Years" },
    { id: 2, title: "Software Engineer", company: "Google", location: "Bangalore", type: "Full-time", category: "Software Engineer", exp: "3-5 Years" },
    { id: 3, title: "Backend Engineer", company: "Microsoft", location: "Hyderabad", type: "Full-time", category: "Backend Developer", exp: "5+ Years" },
    { id: 4, title: "Full Stack Developer", company: "Amazon", location: "Chennai", type: "Full-time", category: "Full Stack", exp: "1-2 Years" },
    { id: 5, title: "Cloud Architect", company: "Google", location: "Bangalore", type: "Full-time", category: "Cloud Engineer", exp: "5+ Years" },
    { id: 6, title: "UI/UX Designer", company: "Infosys", location: "Pune", type: "Contract", category: "UI UX Designer", exp: "3-5 Years" },
  ];

  const filteredJobs = allJobs.filter(job => {
    const matchesSearch = searchTerm === '' || job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = selectedCompany === '' || job.company.toLowerCase().includes(selectedCompany.toLowerCase());
    const matchesCategory = categoryQuery === '' || job.category.toLowerCase() === categoryQuery.toLowerCase();
    return matchesSearch && matchesCompany && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 py-10 px-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6">Explore Job Openings</h1>

        {/* Filter / Search Bar */}
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search jobs by title or skill..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-sm text-gray-800 dark:text-gray-200"
            />
          </div>
          <div className="flex-1 flex items-center border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800">
            <Building2 className="w-5 h-5 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Filter by company..." 
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-sm text-gray-800 dark:text-gray-200"
            />
          </div>
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No jobs found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map(job => (
              <div key={job.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{job.title}</h3>
                    <span className="text-xs bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold px-2.5 py-1 rounded">
                      {job.type}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">{job.company}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-6">
                    <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> {job.location}</span>
                    <span className="flex items-center"><Briefcase className="w-3.5 h-3.5 mr-1" /> {job.exp}</span>
                  </div>
                </div>
                <Link href={`/jobs/${job.id}`} className="inline-block text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading jobs...</div>}>
      <JobsContent />
    </Suspense>
  );
}
