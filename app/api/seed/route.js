import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Job from '@/models/Job';

export async function GET() {
  try {
    await connectDB();
    await Job.deleteMany({});
    const sampleJobs = [
      {
        title: 'Senior React Developer',
        company: 'Google',
        location: 'Bangalore',
        salary: '₹12-18 LPA',
        tags: ['React', 'JavaScript', 'TypeScript', 'Redux'],
        experience: '3-5 Years',
        description: 'Looking for an experienced React developer to build scalable web applications.'
      },
      {
        title: 'Java Developer',
        company: 'Infosys',
        location: 'Pune',
        salary: '₹8-12 LPA',
        tags: ['Java', 'Spring Boot', 'Hibernate', 'Microservices'],
        experience: '1-3 Years',
        description: 'Seeking a Java Spring Boot developer for enterprise backend systems.'
      },
      {
        title: 'Python Developer',
        company: 'Microsoft',
        location: 'Hyderabad',
        salary: '₹10-15 LPA',
        tags: ['Python', 'Django', 'Flask', 'AWS'],
        experience: '3-5 Years',
        description: 'Build robust backend services and cloud integrations using Python.'
      },
      {
        title: 'UI/UX Designer',
        company: 'Adobe',
        location: 'Noida',
        salary: '₹9-14 LPA',
        tags: ['Figma', 'Adobe XD', 'UI Design', 'UX Research'],
        experience: '1-3 Years',
        description: 'Design intuitive and elegant user experiences for top products.'
      }
    ];
    const jobs = await Job.insertMany(sampleJobs);
    return NextResponse.json({ success: true, message: 'Database seeded successfully!', data: jobs });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}