import {
  Award, Users, BookOpen, Target, Eye, Heart, Star, Globe,
  Briefcase, Building, FlaskConical, GraduationCap, Calendar
} from 'lucide-react';
import { alumniPlacements, partnerCompanies } from '../data/faculty';
import { useRevealOnScroll } from '../lib/hooks';

export default function Placements() {
  const pageRef = useRevealOnScroll();

  return (
    <div className="about-page" ref={pageRef}>
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Alumni & Placements</span>
          <h1 className="page-hero-title">Alumni and Placements</h1>
          <p className="page-hero-desc">
            See where our graduates land and how we support every student from classroom to career.
          </p>
        </div>
      </section>

      {/* Alumni Success */}
      <section className="section alumni-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Success Stories</span>
            <h2 className="section-title">Where Our Alumni Work</h2>
            <p className="section-subtitle">
              Graduates making an impact at top companies across the globe.
            </p>
          </div>
          <div className="grid grid-3">
            {alumniPlacements.map((alum, i) => (
              <div key={i} className="alumni-card">
                <span className={`alumni-tag tag-${alum.tag.toLowerCase().replace(' ', '-')}`}>{alum.tag}</span>
                <h4>{alum.name}</h4>
                <p className="alumni-branch">{alum.branch}</p>
                <p className="alumni-company">{alum.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placements Stats */}
      <section className="section placements-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Career</span>
            <h2 className="section-title">Placement Statistics</h2>
            <p className="section-subtitle">
              Our commitment to student success through excellent placement records.
            </p>
          </div>
          <div className="placement-services">
            <h3>Placement Services</h3>
            <div className="services-list">
              <div className="service-item">
                <h4>Training Programs</h4>
                <p>Soft skills, technical training, and interview preparation</p>
              </div>
              <div className="service-item">
                <h4>Industry Connect</h4>
                <p>Guest lectures, workshops, and industry visits</p>
              </div>
              <div className="service-item">
                <h4>Placement Cell</h4>
                <p>Dedicated team for career guidance and job opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recruiters */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Partners</span>
            <h2 className="section-title">Our Recruiters</h2>
          </div>
          <div className="partner-logos">
            <div className="partners-list">
              {partnerCompanies.map((company, i) => (
                <span key={i} className="partner-badge">{company}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}