'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function JobDetailsContent() {
  const searchParams = useSearchParams();
  const [isDark, setIsDark] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const title = searchParams.get('title') || 'Job Title';
  const company = searchParams.get('company') || 'Company Name';
  const location = searchParams.get('location') || 'Remote';
  const type = searchParams.get('type') || 'Full-time';
  const salary = searchParams.get('salary') || 'Competitive';
  const desc = searchParams.get('desc') || 'Exciting job opening with great opportunities for growth.';

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setHasApplied(true);
    }, 800);
  };

  return (
    <div className={`min-h-screen py-12 px-4 flex flex-col items-center transition-colors duration-300 ${isDark ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="w-full max-w-3xl">
        
        {/* Job Card */}
        <div className={`p-8 rounded-3xl border shadow-sm relative ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className={`text-3xl font-extrabold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h1>
              <p className="text-sm text-blue-600 font-semibold">{company}</p>
            </div>
            <a href="/" className="bg-gray-200 dark:bg-gray-800 hover:opacity-80 text-xs font-semibold px-4 py-2 rounded-xl transition">
              ← Back to Home
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
            <span>📍 {location}</span>
            <span>💼 {type}</span>
            <span>💰 {salary}</span>
          </div>

          <div className="mb-8">
            <h2 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Job Description</h2>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{desc}</p>
          </div>

          <div className="mb-8">
            <h2 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Requirements & Skills</h2>
            <ul className={`list-disc list-inside text-sm space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>Strong experience with modern tech stacks and framework architecture.</li>
              <li>Ability to collaborate with cross-functional teams to define, design, and ship new features.</li>
              <li>Good problem-solving skills and passion for clean, maintainable code.</li>
            </ul>
          </div>

          {hasApplied ? (
            <div className="p-4 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-2xl text-center">
              <p className="text-green-700 dark:text-green-400 font-semibold text-sm">🎉 Application Submitted Successfully!</p>
              <p className="text-xs text-green-600 dark:text-green-500 mt-1">The hiring team will review your profile and reach out soon.</p>
            </div>
          ) : (
            <button 
              onClick={handleApply}
              disabled={isApplying}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-2xl transition shadow-sm text-sm disabled:opacity-50"
            >
              {isApplying ? 'Submitting Application...' : 'Apply for this Position'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function JobDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <JobDetailsContent />
    </Suspense>
  );
}