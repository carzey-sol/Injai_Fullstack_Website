'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminArtistsPage() {
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/artists');
        if (!res.ok) throw new Error('Failed to fetch artists');
        setArtists(await res.json());
      } catch (e: any) { setError(e.message); } finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 className="page-title">Artists</h1>
        <Link href="/admin/artists/new" className="btn btn-primary">Add Artist</Link>
      </div>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <div className="artists-grid">
        {artists.map((a) => (
          <div key={a.id} className="artist-card">
            <div className="artist-image">
              <img src={a.image} alt={a.name} />
            </div>
            <div className="artist-info">
              <h3>{a.name}</h3>
              <p>{a.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


