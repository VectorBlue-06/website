import { ExternalLink } from 'lucide-react';
import './Societies.css';

export default function Societies() {
  return (
    <div className="societies-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Student Life</span>
          <h1 className="page-hero-title">Student Societies</h1>
          <p className="page-hero-desc">
            Join vibrant communities that enrich your college experience and help you grow personally and professionally.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="societies-grid">
            {/* Code_d_Code Society */}
            <div className="society-card">
              <div className="society-icon">
                <img src="/images/Code_D_Code Logo.png" alt="Code_d_Code" className="society-logo-img" />
              </div>
              <h3>Code_d_Code Society</h3>
              <p>
                A vibrant community of passionate coders and tech enthusiasts. Join us in building
                projects, competing in hackathons, and exploring the world of technology.
              </p>
              <div className="society-stats">
                <div><strong>100+</strong><span>Active Members</span></div>
                <div><strong>50+</strong><span>Projects</span></div>
                <div><strong>25+</strong><span>Events</span></div>
              </div>
              <a href="https://www.codedcode.tech" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Visit Code_d_Code <ExternalLink size={16} />
              </a>
            </div>

            {/* Add more societies here */}
          </div>
        </div>
      </section>
    </div>
  );
}