'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/events');
        if (!res.ok) throw new Error('Failed to fetch events');
        setEvents(await res.json());
      } catch (e: any) { setError(e.message); } finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 className="page-title">Events</h1>
        <Link href="/admin/events/new" className="btn btn-primary">Add Event</Link>
      </div>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <div className="events-grid">
        {events.map((e) => (
          <div key={e.id} className="event-card">
            <div className="event-date">
              <span className="day">{new Date(e.date).getDate()}</span>
              <span className="month">{new Date(e.date).toLocaleDateString('en-US',{month:'short'}).toUpperCase()}</span>
            </div>
            <div className="event-info">
              <h3>{e.title}</h3>
              <p>{e.description}</p>
              <span className="event-location">{e.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


