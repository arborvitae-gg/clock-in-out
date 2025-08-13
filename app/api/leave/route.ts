import { NextRequest, NextResponse } from 'next/server';

interface LeaveData {
  email: string;
  action: string;
  startDate: string;
  endDate: string;
  reason?: string;
}

export async function POST(request: NextRequest) {
  const data:LeaveData = (await request.json());

  if (!data.email || !data.action || !data.startDate || !data.endDate) {
    return NextResponse.json(
        { error: 'Missing required fields.' }, 
        { status: 400 }
    );
  }

  if (data.action === 'request-paid-leave' && !data.reason) {
    return NextResponse.json(
        { error: 'Reason required for paid leave' }, 
        { status: 400 }
    );
  }

  return NextResponse.json({ status: 'received' });
}