'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function NewVideoPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [artistId, setArtistId] = useState('');
  const [youtubeId, setYoutubeId] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [category, setCategory] = useState<'music' | 'interview' | 'live' | 'behind-scenes'>('music');
  const [featured, setFeatured] = useState(false);
  const [artists, setArtists] = useState<{ _id: string; name: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) router.push('/admin');
  }, [user, loading, router]);

  useEffect(() => {
    const loadArtists = async () => {
      const res = await fetch('/api/artists');
      if (!res.ok) return;
      const data = await res.json();
      setArtists(data.map((a: any) => ({ _id: a._id, name: a.name })));
    };
    loadArtists();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true); setError('');
    try {
      const res = await fetch('/api/videos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, artist: artistId, youtubeId, description, thumbnail, category, featured }) });
      if (!res.ok) throw new Error('Failed to create video');
      router.push('/admin/dashboard');
    } catch (e: any) { setError(e.message || 'Error'); } finally { setSubmitting(false); }
  };

  if (loading || !user) return null;

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <h1 className="page-title">Add New Video</h1>
      <form className="contact-form" onSubmit={onSubmit}>
        {error && <div className="error">{error}</div>}
        <div className="form-group"><label>Title</label><input value={title} onChange={(e)=>setTitle(e.target.value)} required /></div>
        <div className="form-group"><label>Artist</label>
          <select value={artistId} onChange={(e)=>setArtistId(e.target.value)} required>
            <option value="">Select artist</option>
            {artists.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
          </select>
        </div>
        <div className="form-group"><label>YouTube ID</label><input value={youtubeId} onChange={(e)=>setYoutubeId(e.target.value)} required /></div>
        <div className="form-group"><label>Description</label><textarea rows={4} value={description} onChange={(e)=>setDescription(e.target.value)} required />
        </div>
        <div className="form-group"><label>Thumbnail URL</label><input value={thumbnail} onChange={(e)=>setThumbnail(e.target.value)} required /></div>
        <div className="form-group"><label>Category</label>
          <select value={category} onChange={(e)=>setCategory(e.target.value as any)}>
            <option value="music">music</option>
            <option value="interview">interview</option>
            <option value="live">live</option>
            <option value="behind-scenes">behind-scenes</option>
          </select>
        </div>
        <div className="form-group"><label><input type="checkbox" checked={featured} onChange={(e)=>setFeatured(e.target.checked)} /> Featured</label></div>
        <button className="btn btn-primary" disabled={submitting} type="submit">{submitting ? 'Saving...' : 'Save'}</button>
      </form>
    </div>
  );
}


