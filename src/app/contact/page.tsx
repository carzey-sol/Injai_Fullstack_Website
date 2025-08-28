'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">Get in Touch with Injai Channel</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-page">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>Have questions, suggestions, or want to collaborate? We'd love to hear from you. Reach out to us through any of the channels below.</p>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-details">
                    <h3>Email</h3>
                    <p>info@injai-channel.com</p>
                    <p>support@injai-channel.com</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-details">
                    <h3>Phone</h3>
                    <p>+1 (555) 123-4567</p>
                    <p>Monday - Friday, 9AM - 6PM EST</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-details">
                    <h3>Address</h3>
                    <p>123 Music Street</p>
                    <p>Hip Hop City, HC 12345</p>
                    <p>United States</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="contact-details">
                    <h3>Business Hours</h3>
                    <p>Monday - Friday: 9AM - 6PM</p>
                    <p>Saturday: 10AM - 4PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <h3>Follow Us</h3>
                <div className="social-icons">
                  <a href="#" className="social-icon">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-tiktok"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <h2>Send us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="artist-submission">Artist Submission</option>
                    <option value="event-inquiry">Event Inquiry</option>
                    <option value="merchandise">Merchandise</option>
                    <option value="support">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'success' && (
                  <div className="success-message">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="error-message">
                    Sorry, there was an error sending your message. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How can I submit my music?</h3>
              <p>You can submit your music by sending us an email with your tracks, bio, and social media links. We review all submissions and will get back to you within 2-3 business days.</p>
            </div>
            <div className="faq-item">
              <h3>Do you accept international artists?</h3>
              <p>Yes! We welcome artists from all around the world. Guigui rap culture is global, and we're committed to promoting talent from diverse backgrounds.</p>
            </div>
            <div className="faq-item">
              <h3>How can I book an artist for an event?</h3>
              <p>For booking inquiries, please contact us with details about your event, including date, location, budget, and the type of performance you're looking for.</p>
            </div>
            <div className="faq-item">
              <h3>When will the store be available?</h3>
              <p>Our official merchandise store is coming soon! Subscribe to our newsletter to be notified when it launches and get early access to exclusive items.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 