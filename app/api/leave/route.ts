import { NextRequest, NextResponse } from 'next/server';

interface LeaveData {
  email: string;
  action: 'request-paid-leave' | 'declare-sick-leave';
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

  try{
     const webhookUrl = data.action === 'request-paid-leave' 
     ? process.env.N8N_PAID_LEAVE_WEBHOOK
     : process.env.N8N_SICK_LEAVE_WEBHOOK;

     const n8nResponse = await fetch(webhookUrl!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        action: data.action,
        startDate: data.startDate,
        endDate: data.endDate,
        reason: data.reason || null
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