'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/ImageUpload';

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
  links: {
    text: string;
    url: string;
  }[];
}

export default function AdminNewsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    excerpt: '',
    author: '',
    category: 'GENERAL' as 'GENERAL' | 'RELEASES' | 'EVENTS' | 'INTERVIEWS' | 'INDUSTRY',
    featured: false,
    links: [{ text: '', url: '' }]
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin');
    }
  }, [user, loading, router]);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoadingArticles(true);
      const res = await fetch('/api/news');
      if (!res.ok) throw new Error('Failed to fetch articles');
      setArticles(await res.json());
    } catch (e: any) { 
      setError(e.message); 
    } finally { 
      setLoadingArticles(false); 
    }
  };

  const handleDelete = async (articleId: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    
    try {
      const res = await fetch(`/api/news?id=${articleId}`, {
        method: 'DELETE'
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to delete article');
      }
      
      setMessage('Article deleted successfully');
      loadArticles();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleEdit = (article: NewsArticle) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      image: article.image,
      excerpt: article.excerpt,
      author: article.author,
      category: article.category,
      featured: article.featured,
      links: article.links.length > 0 ? article.links : [{ text: '', url: '' }]
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const filteredLinks = formData.links.filter(link => link.text.trim() && link.url.trim());
      
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          links: filteredLinks
        })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save article');
      }
      
      setMessage('Article saved successfully');
      setFormData({
        title: '',
        content: '',
        image: '',
        excerpt: '',
        author: '',
        category: 'GENERAL',
        featured: false,
        links: [{ text: '', url: '' }]
      });
      setEditingArticle(null);
      loadArticles();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const addLink = () => {
    setFormData({
      ...formData,
      links: [...formData.links, { text: '', url: '' }]
    });
  };

  const removeLink = (index: number) => {
    setFormData({
      ...formData,
      links: formData.links.filter((_, i) => i !== index)
    });
  };

  const updateLink = (index: number, field: 'text' | 'url', value: string) => {
    const newLinks = [...formData.links];
    newLinks[index][field] = value;
    setFormData({ ...formData, links: newLinks });
  };

  if (loading || !user) return null;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>News Management</h1>
        <button 
          className="btn btn-primary"
          onClick={() => router.push('/admin/news/new')}
        >
          Add New Article
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError('')} style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
        </div>
      )}

      {message && (
        <div className="success-message">
          {message}
          <button onClick={() => setMessage('')} style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
        </div>
      )}

      {/* Articles List */}
      <div className="admin-form">
        <h2>All Articles</h2>
        {loadingArticles ? (
          <div className="loading">Loading articles...</div>
        ) : articles.length === 0 ? (
          <div className="no-results">No articles found</div>
        ) : (
          <div className="admin-grid">
            {articles.map((article) => (
              <div key={article.id} className="admin-card">
                <div className="admin-card-actions">
                  <button 
                    className="btn-edit"
                    onClick={() => handleEdit(article)}
                    title="Edit Article"
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(article.id)}
                    title="Delete Article"
                  >
                    Delete
                  </button>
                </div>
                <div className="article-image">
                  <img src={article.image} alt={article.title} />
                </div>
                <div className="article-info">
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div style={{ marginTop: '1rem', fontSize: '14px', color: '#666' }}>
                    <p>Author: {article.author}</p>
                    <p>Category: {article.category}</p>
                    <p>Published: {new Date(article.publishedAt).toLocaleDateString()}</p>
                    {article.featured && <span className="status">Featured</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
