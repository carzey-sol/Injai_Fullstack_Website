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
  category: string;
  featured: boolean;
  links?: {
    text: string;
    url: string;
  }[];
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetchNews();
  }, []);

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

  const filteredArticles = activeFilter === 'all' 
    ? articles 
    : articles.filter(article => article.category === activeFilter);

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

      {/* Filter Section */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All News
            </button>
            <button
              className={`filter-btn ${activeFilter === 'releases' ? 'active' : ''}`}
              onClick={() => setActiveFilter('releases')}
            >
              New Releases
            </button>
            <button
              className={`filter-btn ${activeFilter === 'events' ? 'active' : ''}`}
              onClick={() => setActiveFilter('events')}
            >
              Events
            </button>
            <button
              className={`filter-btn ${activeFilter === 'interviews' ? 'active' : ''}`}
              onClick={() => setActiveFilter('interviews')}
            >
              Interviews
            </button>
            <button
              className={`filter-btn ${activeFilter === 'industry' ? 'active' : ''}`}
              onClick={() => setActiveFilter('industry')}
            >
              Industry News
            </button>
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
                      <div className="article-links">
                        {featured.links?.map((link, index) => (
                          <Link key={index} href={link.url} className="btn btn-outline" target="_blank">
                            {link.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
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
                    <div className="article-links">
                      {article.links?.map((link, index) => (
                        <Link key={index} href={link.url} className="btn btn-small" target="_blank">
                          {link.text}
                        </Link>
                      ))}
                    </div>
                  </div>
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
