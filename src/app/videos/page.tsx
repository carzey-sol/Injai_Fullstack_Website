'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Video {
  id: string;
  title: string;
  artist: string;
  description: string;
  youtubeId: string;
  category: string;
  year: string;
  duration: string;
  views: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [artistFilter, setArtistFilter] = useState('all');

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    filterVideos();
  }, [videos, searchTerm, activeFilter, yearFilter, artistFilter]);

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos');
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await response.json();
      setVideos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  };

  const filterVideos = () => {
    let filtered = videos;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(video => video.category === activeFilter);
    }

    // Year filter
    if (yearFilter !== 'all') {
      filtered = filtered.filter(video => video.year === yearFilter);
    }

    // Artist filter
    if (artistFilter !== 'all') {
      filtered = filtered.filter(video => video.artist.toLowerCase().includes(artistFilter.toLowerCase()));
    }

    setFilteredVideos(filtered);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading videos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Video Gallery</h1>
          <p className="page-subtitle">Latest Guigui Rap Content</p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="search-section">
        <div className="container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search videos..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="filter-buttons">
              <button
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Videos
              </button>
              <button
                className={`filter-btn ${activeFilter === 'music-videos' ? 'active' : ''}`}
                onClick={() => setActiveFilter('music-videos')}
              >
                Music Videos
              </button>
              <button
                className={`filter-btn ${activeFilter === 'interviews' ? 'active' : ''}`}
                onClick={() => setActiveFilter('interviews')}
              >
                Interviews
              </button>
              <button
                className={`filter-btn ${activeFilter === 'live' ? 'active' : ''}`}
                onClick={() => setActiveFilter('live')}
              >
                Live Performances
              </button>
              <button
                className={`filter-btn ${activeFilter === 'behind-scenes' ? 'active' : ''}`}
                onClick={() => setActiveFilter('behind-scenes')}
              >
                Behind the Scenes
              </button>
            </div>
            <div className="filter-dropdowns">
              <select
                className="filter-select"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              >
                <option value="all">All Years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
              <select
                className="filter-select"
                value={artistFilter}
                onChange={(e) => setArtistFilter(e.target.value)}
              >
                <option value="all">All Artists</option>
                <option value="mc-flow">MC Flow</option>
                <option value="rhyme-master">Rhyme Master</option>
                <option value="street-poet">Street Poet</option>
                <option value="beat-maker">Beat Maker</option>
                <option value="young-mc">Young MC</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="videos-page">
        <div className="container">
          <div className="videos-grid-large">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <div key={video.id} className="video-card">
                  <div className="video-thumbnail">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="video-info">
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                    <div className="video-meta">
                      <span className="video-date">{video.year}</span>
                      <span className="video-duration">{video.duration}</span>
                      <span className="video-views">{video.views}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No videos found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Load More Button */}
          <div className="load-more-container">
            <button className="btn btn-outline">Load More Videos</button>
          </div>
        </div>
      </section>

      {/* Featured Playlist */}
      <section className="featured-playlist">
        <div className="container">
          <h2 className="section-title">Featured Playlist</h2>
          <div className="playlist-content">
            <div className="playlist-info">
              <h3>Best of Guigui Rap 2024</h3>
              <p>Curated collection of the hottest tracks and performances from the Guigui rap scene this year.</p>
              <div className="playlist-stats">
                <span>25 videos</span>
                <span>•</span>
                <span>2 hours 15 min</span>
                <span>•</span>
                <span>Updated weekly</span>
              </div>
              <Link href="#" className="btn btn-primary">Watch Playlist</Link>
            </div>
            <div className="playlist-preview">
              <div className="playlist-videos">
                <div className="playlist-video">
                  <img src="/images/playlist1.jpg" alt="Playlist Video" />
                  <span className="video-number">1</span>
                </div>
                <div className="playlist-video">
                  <img src="/images/playlist2.jpg" alt="Playlist Video" />
                  <span className="video-number">2</span>
                </div>
                <div className="playlist-video">
                  <img src="/images/playlist3.jpg" alt="Playlist Video" />
                  <span className="video-number">3</span>
                </div>
                <div className="playlist-video">
                  <img src="/images/playlist4.jpg" alt="Playlist Video" />
                  <span className="video-number">4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 