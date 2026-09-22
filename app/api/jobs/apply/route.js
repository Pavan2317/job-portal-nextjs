import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();
    const { userId, jobId, email } = await request.json();

    if (!jobId) {
      return NextResponse.json({ success: false, error: 'Job ID is required' }, { status: 400 });
    }

    // Filter out empty, null, or whitespace-only userIds and emails
    const cleanUserId = userId && userId.trim() !== '' && userId !== 'null' ? userId : null;
    const cleanEmail = email && email.trim() !== '' && email !== 'null' ? email : null;

    const matchCriteria = [];
    if (cleanUserId) matchCriteria.push({ userId: cleanUserId });
    if (cleanEmail) matchCriteria.push({ email: cleanEmail });

    if (matchCriteria.length > 0) {
      const existingApp = await Application.findOne({
        jobId,
        $or: matchCriteria
      });

      if (existingApp) {
        return NextResponse.json({ success: true, message: 'Already applied' });
      }
    }

    await Application.create({ 
      userId: cleanUserId, 
      jobId, 
      email: cleanEmail 
    });
    
    return NextResponse.json({ success: true, message: 'Job applied successfully' }, { status: 201 });
  } catch (error) {
    console.error("DETAILED APPLY ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const email = searchParams.get('email');
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json({ applied: false });
    }

    const cleanUserId = userId && userId.trim() !== '' && userId !== 'null' ? userId : null;
    const cleanEmail = email && email.trim() !== '' && email !== 'null' ? email : null;

    const matchCriteria = [];
    if (cleanUserId) matchCriteria.push({ userId: cleanUserId });
    if (cleanEmail) matchCriteria.push({ email: cleanEmail });

    if (matchCriteria.length === 0) {
      return NextResponse.json({ applied: false });
    }

    const app = await Application.findOne({
      jobId,
      $or: matchCriteria
    });

    return NextResponse.json({ applied: !!app });
  } catch (error) {
    console.error("DETAILED GET ERROR:", error);
    return NextResponse.json({ applied: false, error: error.message }, { status: 500 });
  }
}