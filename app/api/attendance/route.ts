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

  try {
    const n8nResponse = await fetch(process.env.N8N_ATTENDANCE_WEBHOOK!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        action: data.action,
      })
    });

    if (!n8nResponse.ok) throw new Error('n8n forwarding failed');

    return NextResponse.json({ status: 'received' });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'n8n forwarding failed.' }, 
      { status: 500 }
    );
  }
}