'use client';

import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        <p className="text-gray-600 mb-8">
          Please select your dashboard.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard/company"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
          >
            Company Dashboard
          </Link>

          <Link
            href="/dashboard/candidate"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300"
          >
            Candidate Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
