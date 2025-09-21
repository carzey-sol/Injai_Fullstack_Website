'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Artist {
  _id: string;
  name: string;
  bio: string;
  category: string;
  image: string;
  stats: {
    yearsActive: number;
    tracksReleased: number;
    streams: number;
  };
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await fetch('/api/artists');
      if (!response.ok) {
        throw new Error('Failed to fetch artists');
      }
      const data = await response.json();
      setArtists(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredArtists = filter === 'all' 
    ? artists 
    : artists.filter(artist => artist.category === filter);

  if (loading) {
    return (
      <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="container">
          <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Loading artists...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="container">
          <h1 style={{ textAlign: 'center', color: 'red' }}>Error: {error}</h1>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Featured Artists</h1>
          <p className="page-subtitle">Meet the Voices of Guigui Rap</p>
        </div>
      </section>

      {/* Filter Section */}
      <section style={{ padding: '2rem 0', background: 'var(--light-gray)' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem', 
            flexWrap: 'wrap' 
          }}>
            <button 
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter('all')}
            >
              All Artists
            </button>
            <button 
              className={`btn ${filter === 'pioneers' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter('pioneers')}
            >
              Top 10 Now
            </button>
            <button 
              className={`btn ${filter === 'collaborators' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter('collaborators')}
            >
              Highlights
            </button>
            <button 
              className={`btn ${filter === 'emerging' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter('emerging')}
            >
              New Releases
            </button>
          </div>
        </div>
      </section>

      {/* Artists Grid */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <div className="artists-grid">
            {filteredArtists.map((artist) => (
              <div key={artist._id} className="artist-card">
                <div className="artist-image">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    width={300}
                    height={250}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="artist-info">
                  <h3>{artist.name}</h3>
                  <p>{artist.bio}</p>
                  <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    marginTop: '1rem',
                    fontSize: '0.9rem',
                    color: 'var(--dark-gray)'
                  }}>
                    <span>{artist.stats.yearsActive}+ years</span>
                    <span>{artist.stats.tracksReleased}+ tracks</span>
                    <span>{artist.stats.streams.toLocaleString()}+ streams</span>
                  </div>
                  <Link href={`/artists/${artist._id}`} className="btn btn-small" style={{ marginTop: '1rem' }}>
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {filteredArtists.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <h3>No artists found in this category</h3>
              <p>Try selecting a different filter or check back later.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 