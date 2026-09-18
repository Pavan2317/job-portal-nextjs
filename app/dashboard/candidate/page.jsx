import { cookies } from 'next/headers';
import Application from '@/models/Application';
import dbConnect from '@/lib/mongodb';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function CandidateDashboard() {
  await dbConnect();
  
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  // Fetch ONLY applications belonging to this candidate
  const applications = await Application.find({ candidateId: userId }).lean();

  // Server action for handling logout
  async function handleLogout() {
    'use server';
    const cookieStore = await cookies();
    cookieStore.delete('userId');
    // Delete any other auth cookies if named differently (e.g., token)
    cookieStore.delete('token');
    redirect('/login');
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Top Header with Navigation & Logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Candidate Dashboard</h1>
        <div className="flex gap-3">
          <Link 
            href="/jobs" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Browse Jobs
          </Link>
          <form action={handleLogout}>
            <button 
              type="submit" 
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </form>
        </div>
      </div>

      <p className="text-gray-600 mb-6">Applications Submitted: {applications.length}</p>
      
      <div className="overflow-x-auto bg-white rounded shadow border border-gray-200">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-4 text-left">Job Title</th>
              <th className="py-3 px-4 text-left">Company</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Date Applied</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id.toString()} className="border-b">
                <td className="py-3 px-4">{app.jobTitle || 'N/A'}</td>
                <td className="py-3 px-4">{app.company || 'N/A'}</td>
                <td className="py-3 px-4 capitalize">{app.status || 'pending'}</td>
                <td className="py-3 px-4">{new Date(app.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500">No jobs applied yet. Click 'Browse Jobs' to explore and apply!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
