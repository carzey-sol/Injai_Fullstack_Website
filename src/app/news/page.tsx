'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  image: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  category: 'GENERAL' | 'RELEASES' | 'EVENTS' | 'INTERVIEWS' | 'INDUSTRY';
  featured: boolean;
  links?: {
    text: string;
    url: string;
  }[];
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, searchTerm, activeFilter]);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filterArticles = () => {
    let filtered = articles;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(article => article.category === activeFilter);
    }

    setFilteredArticles(filtered);
  };

  if (loading) {
    return (
      <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="container">
          <div className="loading">Loading news...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="container">
          <div className="error">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">News & Updates</h1>
          <p className="page-subtitle">Latest from the Guigui Rap Scene</p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="filter-section">
        <div className="container">
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '1.5rem',
            alignItems: 'center'
          }}>
            {/* Search Input */}
            <div style={{ width: '100%', maxWidth: '500px' }}>
              <input
                type="text"
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>
            
            {/* Filter Buttons */}
            <div className="filter-buttons">
              <button
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All News
              </button>
              <button
                className={`filter-btn ${activeFilter === 'RELEASES' ? 'active' : ''}`}
                onClick={() => setActiveFilter('RELEASES')}
              >
                New Releases
              </button>
              <button
                className={`filter-btn ${activeFilter === 'EVENTS' ? 'active' : ''}`}
                onClick={() => setActiveFilter('EVENTS')}
              >
                Events
              </button>
              <button
                className={`filter-btn ${activeFilter === 'INTERVIEWS' ? 'active' : ''}`}
                onClick={() => setActiveFilter('INTERVIEWS')}
              >
                Interviews
              </button>
              <button
                className={`filter-btn ${activeFilter === 'INDUSTRY' ? 'active' : ''}`}
                onClick={() => setActiveFilter('INDUSTRY')}
              >
                Industry News
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {filteredArticles.length > 0 && (
        <section className="featured-news">
          <div className="container">
            <h2 className="section-title">Featured Story</h2>
            <div className="featured-article">
              {(() => {
                const featured = filteredArticles.find(article => article.featured) || filteredArticles[0];
                return (
                  <Link href={`/news/${featured.id}`} className="featured-article-link">
                    <div className="featured-content">
                      <div className="featured-image">
                        <Image
                          src={featured.image}
                          alt={featured.title}
                          width={600}
                          height={400}
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="featured-text">
                        <div className="article-meta">
                          <span className="article-category">{featured.category}</span>
                          <span className="article-date">{formatDate(featured.publishedAt)}</span>
                        </div>
                        <h3>{featured.title}</h3>
                        <p>{featured.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                );
              })()}
            </div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="news-page">
        <div className="container">
          <h2 className="section-title">Latest News</h2>
          <div className="news-grid">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <article key={article.id} className="news-card">
                  <Link href={`/news/${article.id}`} className="news-card-link">
                    <div className="news-image">
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={400}
                        height={250}
                        style={{ objectFit: 'cover' }}
                      />
                      {article.featured && <span className="featured-badge">Featured</span>}
                    </div>
                    <div className="news-content">
                      <div className="article-meta">
                        <span className="article-category">{article.category}</span>
                        <span className="article-date">{formatDate(article.publishedAt)}</span>
                      </div>
                      <h3>{article.title}</h3>
                      <p>{article.excerpt}</p>
                      <div className="article-author">
                        <span>By {article.author}</span>
                      </div>
                    </div>
                  </Link>
                  {article.links && article.links.length > 0 && (
                    <div className="article-links">
                      {article.links.map((link, index) => (
                        <Link key={index} href={link.url} className="btn btn-small" target="_blank" onClick={(e) => e.stopPropagation()}>
                          {link.text}
                        </Link>
                      ))}
                    </div>
                  )}
                </article>
              ))
            ) : (
              <div className="no-results">
                <p>No news articles found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="news-newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter to get the latest news, releases, and updates from the Guigui rap scene.</p>
            <form className="newsletter-form-large">
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
