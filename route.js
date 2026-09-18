import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Application from '@/models/Application';

export async function GET(request) {
  try {
    await connectDB();

    // Replace with your actual candidate extraction logic
    const candidateId = "YOUR_CANDIDATE_ID_HERE"; 

    const applications = await Application.find({ candidateId: candidateId });

    return NextResponse.json(applications, { status: 200 });

  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}