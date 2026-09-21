'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Building2, MapPin, Briefcase } from 'lucide-react';

export default function CompaniesPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('companyJobs') || '[]');
    setJobs(savedJobs);
  }, []);

  // Extract unique companies from jobs
  const companiesMap = {};
  jobs.forEach(job => {
    if (job.company && !companiesMap[job.company]) {
      companiesMap[job.company] = {
        name: job.company,
        location: job.location || 'Remote',
        openings: 1
      };
    } else if (job.company) {
      companiesMap[job.company].openings += 1;
    }
  });

  const companiesList = Object.values(companiesMap);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 max-w-7xl mx-auto text-gray-900 dark:text-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-2">Explore Companies</h1>
        <p className="text-gray-600 dark:text-gray-400">Discover top companies hiring right now</p>
      </div>

      {companiesList.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 p-12 rounded-2xl border border-gray-200 dark:border-gray-800 text-center text-gray-500">
          No companies registered or posted jobs yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {companiesList.map((comp, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-1">{comp.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
                  <MapPin className="w-4 h-4" /> {comp.location}
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-blue-600" /> {comp.openings} Open Position{comp.openings > 1 ? 's' : ''}
                </span>
                <Link href="/jobs" className="text-blue-600 hover:underline font-medium">
                  View Jobs &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
