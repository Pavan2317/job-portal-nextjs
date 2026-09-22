import dbConnect from '@/lib/mongodb';
import Job from '@/models/Job';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const job = await Job.findById(id);

    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: job },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch Job Error:', error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const body = await request.json();

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        title: body.title,
        company: body.company,
        location: body.location,
        salary: body.salary || '',
        skills: body.skills || '',
        experience: body.experience || '',
        type: body.type || 'Full-time',
        category: body.category || '',
        description: body.description || '',
        requirements: body.requirements || []
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedJob) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedJob },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update Job Error:', error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Job deleted successfully'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete Job Error:', error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
