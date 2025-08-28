'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function NewEventPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState<'festival' | 'concert' | 'release' | 'competition' | 'workshop'>('concert');
  const [status, setStatus] = useState<'upcoming' | 'ongoing' | 'completed' | 'cancelled'>('upcoming');
  const [image, setImage] = useState('');
  const [featured, setFeatured] = useState(false);
  const [ticketPrice, setTicketPrice] = useState<number | undefined>(undefined);
  const [ticketUrl, setTicketUrl] = useState('');
  const [capacity, setCapacity] = useState<number | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { if (!loading && !user) router.push('/admin'); }, [user, loading, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true); setError('');
    try {
      const res = await fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, description, date, location, type, status, image, featured, ticketPrice, ticketUrl, capacity }) });
      if (!res.ok) throw new Error('Failed to create event');
      router.push('/admin/dashboard');
    } catch (e: any) { setError(e.message || 'Error'); } finally { setSubmitting(false); }
  };

  if (loading || !user) return null;

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <h1 className="page-title">Add New Event</h1>
      <form className="contact-form" onSubmit={onSubmit}>
        {error && <div className="error">{error}</div>}
        <div className="form-group"><label>Title</label><input value={title} onChange={(e)=>setTitle(e.target.value)} required /></div>
        <div className="form-group"><label>Description</label><textarea rows={4} value={description} onChange={(e)=>setDescription(e.target.value)} required /></div>
        <div className="form-group"><label>Date</label><input type="datetime-local" value={date} onChange={(e)=>setDate(e.target.value)} required /></div>
        <div className="form-group"><label>Location</label><input value={location} onChange={(e)=>setLocation(e.target.value)} required /></div>
        <div className="form-group"><label>Type</label>
          <select value={type} onChange={(e)=>setType(e.target.value as any)}>
            <option value="festival">festival</option>
            <option value="concert">concert</option>
            <option value="release">release</option>
            <option value="competition">competition</option>
            <option value="workshop">workshop</option>
          </select>
        </div>
        <div className="form-group"><label>Status</label>
          <select value={status} onChange={(e)=>setStatus(e.target.value as any)}>
            <option value="upcoming">upcoming</option>
            <option value="ongoing">ongoing</option>
            <option value="completed">completed</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
        <div className="form-group"><label>Image URL</label><input value={image} onChange={(e)=>setImage(e.target.value)} required /></div>
        <div className="form-group"><label><input type="checkbox" checked={featured} onChange={(e)=>setFeatured(e.target.checked)} /> Featured</label></div>
        <div className="form-group"><label>Ticket Price (optional)</label><input type="number" value={typeof ticketPrice==='number'?ticketPrice:''} onChange={(e)=>setTicketPrice(e.target.value?parseFloat(e.target.value):undefined)} min={0} /></div>
        <div className="form-group"><label>Ticket URL (optional)</label><input value={ticketUrl} onChange={(e)=>setTicketUrl(e.target.value)} /></div>
        <div className="form-group"><label>Capacity (optional)</label><input type="number" value={typeof capacity==='number'?capacity:''} onChange={(e)=>setCapacity(e.target.value?parseInt(e.target.value):undefined)} min={1} /></div>
        <button className="btn btn-primary" disabled={submitting} type="submit">{submitting ? 'Saving...' : 'Save'}</button>
      </form>
    </div>
  );
}


