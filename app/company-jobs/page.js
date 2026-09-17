'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function CompanyJobsContent() {
  const searchParams = useSearchParams();
  const companyName = searchParams.get('name') || 'Company';

  // Dummy jobs database mapped by company
  const companyJobsMap = {
    Google: [
      { title: 'Senior Frontend Engineer', location: 'Mountain View, CA', type: 'Full-time', salary: '$140k - $180k' },
      { title: 'Cloud Infrastructure Developer', location: 'Austin, TX', type: 'Full-time', salary: '$150k - $190k' },
      { title: 'UX Research Lead', location: 'New York, NY', type: 'Full-time', salary: '$130k - $160k' }
    ],
    Microsoft: [
      { title: 'Full Stack .NET Developer', location: 'Redmond, WA', type: 'Full-time', salary: '$135k - $170k' },
      { title: 'Azure Security Architect', location: 'Atlanta, GA', type: 'Full-time', salary: '$160k - $200k' }
    ],
    Amazon: [
      { title: 'AWS Cloud Support Engineer', location: 'Seattle, WA', type: 'Full-time', salary: '$125k - $155k' },
      { title: 'Backend Systems Engineer', location: 'Austin, TX', type: 'Full-time', salary: '$140k - $175k' },
      { title: 'E-commerce React Developer', location: 'Remote', type: 'Contract', salary: '$90 / hr' }
    ],
    Infosys: [
      { title: 'React Frontend Developer', location: 'Hyderabad, India', type: 'Full-time', salary: '₹12 LPA - ₹18 LPA' },
      { title: 'Java Spring Boot Consultant', location: 'Bengaluru, India', type: 'Full-time', salary: '₹14 LPA - ₹22 LPA' }
    ]
  };

  const jobs = companyJobsMap[companyName] || [
    { title: 'Software Engineer', location: 'Global / Remote', type: 'Full-time', salary: 'Competitive' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <div className="bg-white p-8 rounded-2xl border shadow-sm mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{companyName} Openings</h1>
            <p className="text-gray-600 text-sm">Explore current job opportunities posted by {companyName}.</p>
          </div>
          <a href="/" className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-medium px-4 py-2 rounded-xl transition">
            ← Back to Home
          </a>
        </div>

        <div className="space-y-4">
          {jobs.map((job, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-blue-500 transition">
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span>📍 {job.location}</span>
                  <span>💼 {job.type}</span>
                  <span className="text-blue-600 font-semibold">💰 {job.salary}</span>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-5 py-2.5 rounded-xl transition w-full md:w-auto">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CompanyJobsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading jobs...</div>}>
      <CompanyJobsContent />
    </Suspense>
  );
}