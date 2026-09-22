import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    };

    const response = NextResponse.json(
      { success: true, user: userData },
      { status: 200 }
    );

    response.cookies.set('userId', user._id.toString(), {
      httpOnly: false,
      sameSite: 'lax',
      path: '/'
    });

    response.cookies.set('userName', user.name || '', {
      httpOnly: false,
      sameSite: 'lax',
      path: '/'
    });

    response.cookies.set('userEmail', user.email || '', {
      httpOnly: false,
      sameSite: 'lax',
      path: '/'
    });

    response.cookies.set('userRole', user.role || '', {
      httpOnly: false,
      sameSite: 'lax',
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Login Error:', error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
