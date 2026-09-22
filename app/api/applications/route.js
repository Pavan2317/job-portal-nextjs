import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';
import Job from '@/models/Job';

export async function GET(req) {
  try {
    await dbConnect();

    const cookieStore = await cookies();

    const loggedUserId = cookieStore.get('userId')?.value || '';
    const loggedUserEmail = cookieStore.get('userEmail')?.value || '';

    const { searchParams } = new URL(req.url);

    const candidateId = searchParams.get('candidateId');
    const companyId = searchParams.get('companyId');

    // Company dashboard
    if (companyId) {
      const jobs = await Job.find({ companyId }).select('_id');

      // Application.jobId is stored as a string,
      // so convert MongoDB ObjectIds to strings before querying.
      const jobIds = jobs.map(job => job._id.toString());

      const applications = await Application.find({
        companyId: companyId
      }).sort({ createdAt: -1 });

      return NextResponse.json(
        { success: true, applications },
        { status: 200 }
      );
    }

    // Candidate dashboard
    const id = candidateId || loggedUserId;

    let query = {};

    if (id) {
      query = {
        $or: [
          { candidateId: id },
          { userId: id }
        ]
      };
    } else if (loggedUserEmail) {
      query = {
        $or: [
          { candidateEmail: loggedUserEmail },
          { email: loggedUserEmail }
        ]
      };
    } else {
      return NextResponse.json(
        { success: true, applications: [] },
        { status: 200 }
      );
    }

    const applications = await Application.find(query)
      .sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, applications },
      { status: 200 }
    );

  } catch (error) {
    console.error('Fetch Applications Error:', error);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const cookieStore = await cookies();

    const userId =
      cookieStore.get('userId')?.value ||
      body.userId ||
      body.candidateId ||
      '';

    const candidateName =
      cookieStore.get('userName')?.value ||
      body.candidateName ||
      '';

    const candidateEmail =
      cookieStore.get('userEmail')?.value ||
      body.candidateEmail ||
      body.email ||
      '';

    if (!userId && !candidateEmail) {
      return NextResponse.json(
        { success: false, message: 'Candidate login is required' },
        { status: 401 }
      );
    }

    const {
      jobId,
      jobTitle,
      company,
      companyId
    } = body;

    if (!jobId) {
      return NextResponse.json(
        { success: false, message: 'Job ID is required' },
        { status: 400 }
      );
    }

    const existing = await Application.findOne({
      jobId,
      $or: [
        ...(userId ? [
          { candidateId: userId },
          { userId }
        ] : []),
        ...(candidateEmail ? [
          { candidateEmail },
          { email: candidateEmail }
        ] : [])
      ]
    });

    if (existing) {
      return NextResponse.json(
        {
          success: true,
          alreadyApplied: true,
          data: existing
        },
        { status: 200 }
      );
    }

    const newApplication = await Application.create({
      userId,
      candidateId: userId,

      jobId,

      email: candidateEmail,
      candidateEmail,
      candidateName,

      companyId: companyId || '',
      company: company || '',
      jobTitle: jobTitle || '',

      status: 'pending'
    });

    return NextResponse.json(
      {
        success: true,
        alreadyApplied: false,
        data: newApplication
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Application Error:', error);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}


