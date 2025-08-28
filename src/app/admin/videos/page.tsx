'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/videos');
        if (!res.ok) throw new Error('Failed to fetch videos');
        setVideos(await res.json());
      } catch (e: any) { setError(e.message); } finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 className="page-title">Videos</h1>
        <Link href="/admin/videos/new" className="btn btn-primary">Add Video</Link>
      </div>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <div className="videos-grid">
        {videos.map((v) => (
          <div key={v.id} className="video-card">
            <div className="video-thumbnail"><iframe src={`https://www.youtube.com/embed/${v.youtubeId}`} frameBorder={0} allowFullScreen></iframe></div>
            <div className="video-info">
              <h3>{v.title}</h3>
              <p>{v.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


