'use client';

import { useState, FormEvent } from 'react';

type FormAction = 
  | 'clock-in' 
  | 'clock-out' 
  | 'declare-sick-leave'
  | 'request-paid-leave' 

export default function Home() {
  const [action, setAction] = useState<FormAction | null>(null);;
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('Processing...');

    try {
      let endpoint = '';
      let body: Record<string, any> = { email };
      

      switch (action) {
        case 'clock-in': case 'clock-out':
          endpoint = '/api/attendance';
           body = { ...body, action };
          break;

        case 'declare-sick-leave':
          endpoint = '/api/leave';
          body = { ...body, action, startDate, endDate };
          break;

        case 'request-paid-leave':
          endpoint = '/api/leave';
           body = { ...body, action, startDate, endDate, reason };
          break;

        default:
          return;
      }

      const response = await fetch( endpoint, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      
      // after sending a successful request, the form is cleared except for the email field
      if (response.ok) {
        setMessage(`Success! ${action?.replace(/-/g, ' ')} successfully recorded.`);
        setAction(null);
        setStartDate(''); setEndDate('');
        setReason('');
      } else {
        setMessage('Error submitting data');
      }
      
    } 
    catch (error) {
      console.error(error);
      alert('Error submitting form.');
    }
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <label>Actions:</label>
      <br />
      
      {([
          'clock-in', 
          'clock-out', 
          'declare-sick-leave',
          'request-paid-leave',
          
        ] as FormAction[]).map((a) => ( // a = action
        <div key={a}>
          <input
            id={a}
            name="action"
            type="radio"
            required
            checked={action === a}
            onChange={() => setAction(a)}
          />
          <label htmlFor={a}> {a.replace(/-/g, ' ')}</label>
          <br />
        </div>
      ))}

      {(action === 'request-paid-leave' || action === 'declare-sick-leave') && (
        <>
          <label htmlFor="start-date">Start Date:</label>
          <input
            id="start-date"
            type="date"
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <br />

          <label htmlFor="end-date">End Date:</label>
          <input
            id="end-date"
            type="date"
            required
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <br />
        </>
      )}

      {action === 'request-paid-leave' && (
        <>
          <label htmlFor="reason">Reason for leave:</label>
          <br />
          <textarea
            id="reason"
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <br />
        </>
      )}

      <button type="submit">Submit</button>
      <br />

      {message && <p>{message}</p>}

    </form>
  );
}