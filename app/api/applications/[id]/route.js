import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';

export async function PUT(request, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const body = await request.json();

    const allowedStatuses = [
      'pending',
      'reviewing',
      'accepted',
      'rejected'
    ];

    if (!allowedStatuses.includes(body.status)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid application status'
        },
        { status: 400 }
      );
    }

    const updatedApplication =
      await Application.findByIdAndUpdate(
        id,
        { status: body.status },
        {
          new: true,
          runValidators: true
        }
      );

    if (!updatedApplication) {
      return NextResponse.json(
        {
          success: false,
          error: 'Application not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedApplication
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Update Application Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}
