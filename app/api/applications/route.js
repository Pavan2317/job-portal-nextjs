import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';

export async function GET(req) {
  try {
    await dbConnect();
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;

    // Fetch applications, optionally filtered by user if stored in cookies
    const query = userId ? { candidateId: userId } : {};
    const applications = await Application.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, applications }, { status: 200 });
  } catch (error) {
    console.error('Fetch Applications Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const cookieStore = await cookies();
    let userId = cookieStore.get('userId')?.value || 'default_candidate_id';
    let candidateName = cookieStore.get('userName')?.value || body.candidateName || 'Pavan';
    let candidateEmail = cookieStore.get('userEmail')?.value || body.candidateEmail || 'pavan@example.com';

    const { jobId, jobTitle, company } = body;

    if (!jobId) {
      return NextResponse.json({ message: 'Job ID is required' }, { status: 400 });
    }

    const newApplication = await Application.create({
      candidateId: userId,
      candidateName: candidateName,
      candidateEmail: candidateEmail,
      jobId: jobId,
      jobTitle: jobTitle || 'Job Position',
      company: company || 'Company',
      status: 'pending',
      createdAt: new Date()
    });

    return NextResponse.json({ success: true, data: newApplication }, { status: 201 });
  } catch (error) {
    console.error('API Application Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}