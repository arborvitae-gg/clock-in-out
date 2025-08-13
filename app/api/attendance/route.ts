import { NextRequest, NextResponse } from 'next/server';

interface AttendanceData {
  email: string;
  action: 'clock-in' | 'clock-out';
}

export async function POST(request: NextRequest) {
  const data:AttendanceData = (await request.json());

  if (!data.email || !data.action) {
    return NextResponse.json(
        { error: 'Missing required fields.' }, 
        { status: 400 }
    );
  }

  return NextResponse.json({ status: 'received' });
}