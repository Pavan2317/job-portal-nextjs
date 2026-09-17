import dbConnect from '@/lib/mongodb';
import Application from '@/models/Application';
import { NextResponse } from 'next/server';

export async function GET(request) {
try {
await dbConnect();
const { searchParams } = new URL(request.url);
const candidateEmail = searchParams.get('candidateEmail');
const jobId = searchParams.get('jobId');

let query = {};
if (candidateEmail) query.candidateEmail = candidateEmail;
if (jobId) query.jobId = jobId;

const applications = await Application.find(query).sort({ createdAt: -1 });
return NextResponse.json({ success: true, data: applications }, { status: 200 });
} catch (error) {
console.error('GET /api/applications error:', error);
return NextResponse.json({ success: false, error: error.message }, { status: 400 });
}
}

export async function POST(request) {
try {
await dbConnect();
const body = await request.json();
const newApplication = await Application.create(body);
return NextResponse.json({ success: true, data: newApplication }, { status: 201 });
} catch (error) {
console.error('POST /api/applications error:', error);
return NextResponse.json({ success: false, error: error.message }, { status: 400 });
}
}
