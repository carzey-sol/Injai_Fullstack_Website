'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '10px', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', boxShadow: 'var(--shadow)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div>
            <h1 style={{ color: 'var(--primary-color)', marginBottom: '0.25rem' }}>Welcome, {user.username}</h1>
            <p style={{ color: 'var(--dark-gray)' }}>Manage your content and settings</p>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <img src="/images/admin-welcome.png" alt="Welcome" style={{ width: 120, height: 'auto' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', boxShadow: 'var(--shadow)' }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>
              <i className="fas fa-microphone" style={{ marginRight: '0.5rem' }}></i>
              Artists
            </h2>
            <p style={{ color: 'var(--dark-gray)', marginBottom: '1.5rem' }}>Manage artist profiles, bios, and social links.</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/admin/artists" className="btn btn-primary">View All</Link>
              <Link href="/admin/artists/new" className="btn btn-outline">Add New</Link>
            </div>
          </div>

          <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', boxShadow: 'var(--shadow)' }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>
              <i className="fas fa-video" style={{ marginRight: '0.5rem' }}></i>
              Videos
            </h2>
            <p style={{ color: 'var(--dark-gray)', marginBottom: '1.5rem' }}>Upload and manage video content.</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/admin/videos" className="btn btn-primary">View All</Link>
              <Link href="/admin/videos/new" className="btn btn-outline">Add New</Link>
            </div>
          </div>

          <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', boxShadow: 'var(--shadow)' }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>
              <i className="fas fa-calendar" style={{ marginRight: '0.5rem' }}></i>
              Events
            </h2>
            <p style={{ color: 'var(--dark-gray)', marginBottom: '1.5rem' }}>Create and manage upcoming events.</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/admin/events" className="btn btn-primary">View All</Link>
              <Link href="/admin/events/new" className="btn btn-outline">Add New</Link>
            </div>
          </div>

          <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', boxShadow: 'var(--shadow)' }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>
              <i className="fas fa-cog" style={{ marginRight: '0.5rem' }}></i>
              Site Settings
            </h2>
            <p style={{ color: 'var(--dark-gray)', marginBottom: '1.5rem' }}>Manage social links, team and contact content.</p>
            <Link href="/admin/settings" className="btn btn-primary">Open Settings</Link>
          </div>
        </div>
      </div>
    </div>
  );
}


