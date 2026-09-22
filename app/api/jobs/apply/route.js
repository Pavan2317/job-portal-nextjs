import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();
    const { userId, jobId, email } = await request.json();

    const existingApp = await Application.findOne({ userId, jobId });
    if (existingApp) {
      return NextResponse.json({ success: true, message: 'Already applied' });
    }

    await Application.create({ userId, jobId, email });
    return NextResponse.json({ success: true, message: 'Job applied successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const jobId = searchParams.get('jobId');

    if (userId && jobId) {
      const app = await Application.findOne({ userId, jobId });
      return NextResponse.json({ applied: !!app });
    }

    return NextResponse.json({ success: false }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
