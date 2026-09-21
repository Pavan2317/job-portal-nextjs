import Link from 'next/link';
import { jobs } from '@/app/data/jobsData';

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Browse All Jobs</h1>
      
      <div className="grid grid-cols-1 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{job.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{job.company} &bull; {job.location} &bull; {job.type}</p>
            </div>
            <Link href={`/jobs/${job.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
