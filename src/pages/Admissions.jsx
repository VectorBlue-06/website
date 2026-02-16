import { Link } from 'react-router-dom';
import {
  FileText, CheckCircle, ArrowRight, Calendar, Users,
  GraduationCap, ExternalLink, ClipboardList
} from 'lucide-react';
import { btechPrograms, mtechPrograms, admissionProcess } from '../data/academics';
import { externalLinks } from '../data/siteData';
import { useRevealOnScroll } from '../lib/hooks';
import './Admissions.css';

export default function Admissions() {
  const pageRef = useRevealOnScroll();

  return (
    <div className="admissions-page" ref={pageRef}>
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Admissions</span>
          <h1 className="page-hero-title">Join SoET</h1>
          <p className="page-hero-desc">
            Start your journey towards engineering excellence. Apply for 2025-26 session.
          </p>
          <div style={{ marginTop: '1.5rem' }}>
            <a
              href={externalLinks.admissionPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
              style={{ background: 'var(--color-white)', color: 'var(--color-primary-blue)' }}
            >
              Apply Online <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">How to Apply</span>
            <h2 className="section-title">Admission Process</h2>
          </div>
          <div className="process-grid">
            {admissionProcess.map((step) => (
              <div key={step.step} className="process-card reveal">
                <div className="process-step">{step.step}</div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="section eligibility-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Requirements</span>
            <h2 className="section-title">Eligibility Criteria</h2>
          </div>
          <div className="elig-grid">
            <div className="elig-card">
              <div className="elig-header">
                <GraduationCap size={24} />
                <h3>B.Tech Eligibility</h3>
              </div>
              <ul>
                <li><CheckCircle size={16} /> 12th with Physics, Chemistry, Mathematics</li>
                <li><CheckCircle size={16} /> Minimum 45% aggregate (40% for reserved categories)</li>
                <li><CheckCircle size={16} /> Valid JEE Main / State CET score</li>
              </ul>
            </div>
            <div className="elig-card">
              <div className="elig-header">
                <GraduationCap size={24} />
                <h3>M.Tech Eligibility</h3>
              </div>
              <ul>
                <li><CheckCircle size={16} /> B.Tech / B.E. from recognized university</li>
                <li><CheckCircle size={16} /> Minimum 50% aggregate (45% for reserved categories)</li>
                <li><CheckCircle size={16} /> GATE score preferred</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Summary */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Programs</span>
            <h2 className="section-title">Available Programs</h2>
          </div>

          <h3 className="programs-subhead">B.Tech Programs (4 Years)</h3>
          <div className="programs-table">
            <div className="table-header">
              <span>Program</span>
              <span>Intake</span>
              <span>Eligibility</span>
            </div>
            {btechPrograms.map((prog) => (
              <div key={prog.id} className="table-row">
                <span className="prog-name">{prog.name}</span>
                <span className="prog-intake">{prog.intake} seats</span>
                <span className="prog-elig">{prog.eligibility}</span>
              </div>
            ))}
          </div>

          <h3 className="programs-subhead" style={{ marginTop: '2.5rem' }}>M.Tech Programs (2 Years)</h3>
          <div className="programs-table">
            <div className="table-header">
              <span>Program</span>
              <span>Intake</span>
              <span>Eligibility</span>
            </div>
            {mtechPrograms.map((prog) => (
              <div key={prog.id} className="table-row">
                <span className="prog-name">{prog.name}</span>
                <span className="prog-intake">{prog.intake} seats</span>
                <span className="prog-elig">{prog.eligibility}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section admission-cta">
        <div className="container text-center">
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>Ready to Begin Your Journey?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            Apply now for the upcoming academic session and join a community of future engineers.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={externalLinks.admissionPortal} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg" style={{ background: 'var(--color-white)', color: 'var(--color-primary-red)' }}>
              Apply Online <ExternalLink size={16} />
            </a>
            <Link to="/contact" className="btn btn-outline btn-lg" style={{ borderColor: 'white', color: 'white' }}>
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
