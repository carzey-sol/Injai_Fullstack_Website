export default function AboutPage() {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">About Injai Channel</h1>
          <p className="page-subtitle">The Story Behind the Movement</p>
        </div>
      </section>

      {/* Story Section */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '4rem', 
            alignItems: 'center' 
          }}>
            <div>
              <h2 style={{ 
                fontSize: '2.5rem', 
                marginBottom: '2rem', 
                color: 'var(--primary-color)' 
              }}>
                Our Mission
              </h2>
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8', 
                color: 'var(--dark-gray)',
                marginBottom: '1.5rem'
              }}>
                Injai Channel is dedicated to promoting and preserving Guigui rap culture. 
                We believe in the power of authentic storytelling and the importance of 
                giving voice to the urban experience.
              </p>
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8', 
                color: 'var(--dark-gray)',
                marginBottom: '1.5rem'
              }}>
                Founded by passionate music enthusiasts, we've created a platform that 
                celebrates the raw energy, complex wordplay, and cultural significance 
                of Guigui rap music.
              </p>
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.8', 
                color: 'var(--dark-gray)'
              }}>
                Our goal is to connect artists with their audience, preserve cultural 
                heritage, and foster the next generation of Guigui rap talent.
              </p>
            </div>
            <div style={{ 
              background: 'var(--gradient-primary)', 
              height: '400px', 
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.2rem',
              textAlign: 'center',
              padding: '2rem'
            }}>
              <div>
                <i className="fas fa-microphone" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
                <h3>Amplifying Voices</h3>
                <p>Giving platform to authentic Guigui rap culture</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: '5rem 0', background: 'var(--light-gray)' }}>
        <div className="container">
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2.5rem', 
            marginBottom: '3rem',
            color: 'var(--primary-color)'
          }}>
            Our Values
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem' 
          }}>
            <div style={{ 
              background: 'white', 
              padding: '2rem', 
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: 'var(--shadow)'
            }}>
              <i className="fas fa-heart" style={{ 
                fontSize: '2.5rem', 
                color: 'var(--secondary-color)', 
                marginBottom: '1rem' 
              }}></i>
              <h3>Authenticity</h3>
              <p>We believe in real stories from real people, preserving the genuine 
              voice of the community.</p>
            </div>
            
            <div style={{ 
              background: 'white', 
              padding: '2rem', 
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: 'var(--shadow)'
            }}>
              <i className="fas fa-users" style={{ 
                fontSize: '2.5rem', 
                color: 'var(--secondary-color)', 
                marginBottom: '1rem' 
              }}></i>
              <h3>Community</h3>
              <p>Building connections between artists, fans, and culture enthusiasts 
              to strengthen the Guigui rap scene.</p>
            </div>
            
            <div style={{ 
              background: 'white', 
              padding: '2rem', 
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: 'var(--shadow)'
            }}>
              <i className="fas fa-star" style={{ 
                fontSize: '2.5rem', 
                color: 'var(--secondary-color)', 
                marginBottom: '1rem' 
              }}></i>
              <h3>Excellence</h3>
              <p>Promoting high-quality content and supporting artists in their 
              pursuit of musical excellence.</p>
            </div>
            
            <div style={{ 
              background: 'white', 
              padding: '2rem', 
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: 'var(--shadow)'
            }}>
              <i className="fas fa-globe" style={{ 
                fontSize: '2.5rem', 
                color: 'var(--secondary-color)', 
                marginBottom: '1rem' 
              }}></i>
              <h3>Innovation</h3>
              <p>Embracing new technologies and creative approaches to showcase 
              Guigui rap culture globally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div>
              <h3 style={{ 
                fontSize: '3rem', 
                color: 'var(--secondary-color)', 
                marginBottom: '0.5rem' 
              }}>50+</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--dark-gray)' }}>Artists Featured</p>
            </div>
            <div>
              <h3 style={{ 
                fontSize: '3rem', 
                color: 'var(--secondary-color)', 
                marginBottom: '0.5rem' 
              }}>500+</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--dark-gray)' }}>Videos Published</p>
            </div>
            <div>
              <h3 style={{ 
                fontSize: '3rem', 
                color: 'var(--secondary-color)', 
                marginBottom: '0.5rem' 
              }}>100+</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--dark-gray)' }}>Events Organized</p>
            </div>
            <div>
              <h3 style={{ 
                fontSize: '3rem', 
                color: 'var(--secondary-color)', 
                marginBottom: '0.5rem' 
              }}>10K+</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--dark-gray)' }}>Community Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section (Managed via Settings) */}
      <TeamSection />

      {/* Get in Touch Section (Managed via Settings) */}
      <GetInTouchSection />
    </div>
  );
} 

function TeamSection() {
  // client component wrapper via dynamic fetch
  return (
    <section style={{ padding: '5rem 0', background: 'var(--light-gray)' }}>
      <div className="container">
        <TeamClient />
      </div>
    </section>
  );
}

function GetInTouchSection() {
  return (
    <section style={{ padding: '5rem 0' }}>
      <div className="container">
        <GetInTouchClient />
      </div>
    </section>
  );
}

// Client subcomponents
// eslint-disable-next-line @next/next/no-sync-scripts
// Keep minimal JS; reusing global styles to preserve design
// Using inline client components inside same file for simplicity
// They will fetch from /api/settings

// @ts-ignore
const TeamClient = (() => {
  return require('./team.client').default;
})();

// @ts-ignore
const GetInTouchClient = (() => {
  return require('./getintouch.client').default;
})();