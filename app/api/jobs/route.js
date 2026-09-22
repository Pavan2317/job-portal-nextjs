import dbConnect from '@/lib/mongodb';
import Job from '@/models/Job';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');

    const query = companyId ? { companyId } : {};

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: jobs },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch Jobs Error:', error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const cookieStore = await cookies();

    const userId = cookieStore.get('userId')?.value || body.companyId || '';
    const userName = cookieStore.get('userName')?.value || body.company || '';

    if (!body.title || !body.location) {
      return NextResponse.json(
        {
          success: false,
          error: 'Job title and location are required'
        },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Company login is required before posting a job'
        },
        { status: 401 }
      );
    }

    const newJob = await Job.create({
      title: body.title,
      company: body.company || userName,
      companyId: userId,
      location: body.location,
      salary: body.salary || '',
      skills: body.skills || '',
      experience: body.experience || '',
      type: body.type || 'Full-time',
      category: body.category || '',
      description: body.description || '',
      requirements: body.requirements || []
    });

    return NextResponse.json(
      { success: true, data: newJob },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create Job Error:', error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
