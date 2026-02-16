import { Link } from 'react-router-dom';
import {
  GraduationCap, Users, FlaskConical, BookOpen, Award, Calendar,
  ArrowRight, Monitor, Cpu, Zap, ChevronRight, Building, Lightbulb,
  Trophy, Code2, ExternalLink
} from 'lucide-react';
import { siteConfig, stats, externalLinks } from '../data/siteData';
import { useRevealOnScroll } from '../lib/hooks';
import './Home.css';

const featuredPrograms = [
  {
    icon: <Cpu size={28} />,
    title: 'Electronics & Computer Science',
    desc: 'AI, ML, IoT, and next-generation computing technologies.',
    color: 'blue',
  },
  {
    icon: <Building size={28} />,
    title: 'Mechanical Engineering',
    desc: 'Manufacturing, robotics, automation, and thermal systems.',
    color: 'red',
  },
  {
    icon: <Zap size={28} />,
    title: 'Electrical Engineering',
    desc: 'Power systems, renewable energy, and smart grid technologies.',
    color: 'blue',
  },
];

const campusFeatures = [
  { icon: <FlaskConical size={24} />, title: 'Modern Laboratories', desc: '6 specialized labs with latest equipment' },
  { icon: <BookOpen size={24} />, title: 'Digital Library', desc: '2500+ books and digital resources' },
  { icon: <Users size={24} />, title: 'Student Societies', desc: 'Code_d_Code and other active clubs' },
  { icon: <Trophy size={24} />, title: 'Competitions', desc: 'Regular hackathons and tech events' },
];

const quickLinks = [
  { label: 'Online Fee Payment', url: externalLinks.feePayment, icon: <ExternalLink size={16} /> },
  { label: 'University Portal', url: externalLinks.universityPortal, icon: <ExternalLink size={16} /> },
  { label: 'Exam Results', url: externalLinks.examResults, icon: <ExternalLink size={16} /> },
  { label: 'Academic Calendar', url: externalLinks.academicCalendar, icon: <ExternalLink size={16} /> },
];

export default function Home() {
  const pageRef = useRevealOnScroll();
  
  return (
    <div className="home-page" ref={pageRef}>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-image" />
        <div className="hero-bg-pattern" />
        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-badge">
              <Award size={16} /> {siteConfig.approval} | Since {siteConfig.founded}
            </span>
            <h1 className="hero-title">
              Empowering <span className="text-gradient">Innovation</span>,<br />
              Shaping <span className="text-gradient-blue">Futures</span>
            </h1>
            <p className="hero-desc">
              {siteConfig.name}, {siteConfig.university} — Premier destination for
              engineering excellence, research, and holistic development. Where tomorrow's
              engineers are born today.
            </p>
            <div className="hero-features">
              <span><GraduationCap size={18} /> 30+ Expert Faculty</span>
              <span><Building size={18} /> 6 Departments</span>
              <span><FlaskConical size={18} /> Modern Labs</span>
            </div>
            <div className="hero-actions">
              <Link to="/admissions" className="btn btn-primary btn-lg">
                Explore Programs <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn btn-outline btn-lg">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card hero-card-1">
              <Monitor size={24} />
              <span>250+ Computer Systems</span>
            </div>
            <div className="hero-card hero-card-2">
              <GraduationCap size={24} />
              <span>2200+ Students</span>
            </div>
            <div className="hero-card hero-card-3">
              <Award size={24} />
              <span>11 Programs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="section programs-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-badge">Our Programs</span>
            <h2 className="section-title">Featured Engineering Programs</h2>
            <p className="section-subtitle">
              Discover our top programs designed to prepare you for the future of technology.
            </p>
          </div>
          <div className="grid grid-3">
            {featuredPrograms.map((prog, i) => (
              <div key={i} className={`program-card program-card-${prog.color} reveal delay-${i + 1}`}>
                <div className="program-icon">{prog.icon}</div>
                <h3>{prog.title}</h3>
                <p>{prog.desc}</p>
                <Link to="/departments" className="program-link">
                  Learn More <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Link to="/departments" className="btn btn-secondary">
              View All Programs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Campus Life */}
      <section className="section campus-section">
        <div className="container">
          <div className="campus-grid">
            <div className="campus-info reveal-left reveal">
              <span className="section-badge">Campus Life</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Experience a Vibrant Campus
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Our campus offers a perfect blend of academic rigor and extracurricular activities,
                fostering holistic development of every student.
              </p>
              <div className="campus-features">
                {campusFeatures.map((feat, i) => (
                  <div key={i} className="campus-feature-item">
                    <div className="cf-icon">{feat.icon}</div>
                    <div>
                      <h4>{feat.title}</h4>
                      <p>{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="campus-visual reveal-right reveal">
              <div className="campus-gallery">
                <img
                  src="/images/College Pics/College/IMG-20241226-WA0010.jpg"
                  alt="SoET Campus"
                  className="gallery-main"
                  loading="lazy"
                />
                <img
                  src="/images/College Pics/LAB/Computer Lab.jpg"
                  alt="Computer Lab"
                  className="gallery-thumb gallery-thumb-1"
                  loading="lazy"
                />
                <img
                  src="/images/College Pics/Auditorium/Auditorium.jpg"
                  alt="Auditorium"
                  className="gallery-thumb gallery-thumb-2"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code_d_Code */}
      <section className="section cdc-section">
        <div className="container">
          <div className="cdc-content reveal">
            <div className="cdc-icon">
              <img src="/images/Code_D_Code Logo.png" alt="Code_d_Code" className="cdc-logo-img" />
            </div>
            <h2>Code_d_Code Society</h2>
            <p>
              A vibrant community of passionate coders and tech enthusiasts. Join us in building
              projects, competing in hackathons, and exploring the world of technology.
            </p>
            <div className="cdc-stats">
              <div><strong>100+</strong><span>Active Members</span></div>
              <div><strong>50+</strong><span>Projects</span></div>
              <div><strong>25+</strong><span>Events</span></div>
            </div>
            <a href="https://www.codedcode.tech" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Visit Code_d_Code <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section-sm quick-links-section">
        <div className="container">
          <h3 style={{ textAlign: 'center', color: 'var(--color-primary-blue)', marginBottom: '1.5rem' }}>Quick Resources</h3>
          <div className="quick-links-grid">
            {quickLinks.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="quick-link-card">
                {link.icon}
                <span>{link.label}</span>
                <ArrowRight size={14} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
