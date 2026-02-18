import {
  Award, Users, BookOpen, Target, Eye, Heart, Star, Globe,
  Briefcase, Building, FlaskConical, GraduationCap, Calendar
} from 'lucide-react';
import { leadership, researchAreas, partnerCompanies } from '../data/faculty';
import { useRevealOnScroll } from '../lib/hooks';

const coreValues = [
  { icon: <BookOpen size={24} />, title: 'Quality Education', desc: 'Dynamic knowledge and practical skills through cutting-edge curriculum.' },
  { icon: <Award size={24} />, title: 'Leadership', desc: 'Developing quality leadership among students for the engineering profession.' },
  { icon: <Heart size={24} />, title: 'Social Values', desc: 'Instilling social and moral values in every graduate.' },
  { icon: <Globe size={24} />, title: 'National Heritage', desc: 'Pride for national heritage and culture through education.' },
  { icon: <Star size={24} />, title: 'Professional Excellence', desc: 'Producing top quality technical professionals for the industry.' },
];

const whyChoose = [
  { icon: <Award size={28} />, title: 'AICTE Approved', desc: 'Nationally recognized institution with AICTE approval.' },
  { icon: <BookOpen size={28} />, title: 'Quality Education', desc: 'Global standards of teaching and learning methodology.' },
  { icon: <Users size={28} />, title: 'Experienced Faculty', desc: '22 professors + 7 staff = 30 expert team members.' },
  { icon: <FlaskConical size={28} />, title: 'Research Focus', desc: 'Active research in AI, IoT, Renewable Energy, and more.' },
  { icon: <Briefcase size={28} />, title: 'Industry Partnerships', desc: '25+ partner companies for placements and training.' },
  { icon: <Building size={28} />, title: 'Modern Infrastructure', desc: 'State-of-the-art laboratories and campus facilities.' },
];

const timeline = [
  { year: '1957', title: 'Foundation', desc: 'Samrat Vikramaditya Vishwavidyalaya established.' },
  { year: '1960s', title: 'Engineering Programs Launch', desc: 'Civil, Mechanical, and Electrical programs started.' },
  { year: '1990s', title: 'Expansion', desc: 'Computer Science and Electronics programs added.' },
  { year: '2000s', title: 'Modernization', desc: 'State-of-the-art laboratories and research facilities built.' },
  { year: '2011', title: 'SoET Established', desc: 'School of Engineering and Technology formed as UTD.' },
  { year: '2020s', title: 'Digital Transformation', desc: 'AI, IoT, and modern technology integration.' },
];

const facultyStats = [
  { value: '150+', label: 'Research Publications' },
  { value: '30', label: 'Faculty & Staff' },
  { value: '11', label: 'Academic Programs' },
  { value: '2500+', label: 'Library Books' },
];

export default function About() {
  const pageRef = useRevealOnScroll();

  return (
    <div className="about-page" ref={pageRef}>
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">About Us</span>
          <h1 className="page-hero-title">Our Legacy of Excellence</h1>
          <p className="page-hero-desc">
            Since 1957, shaping futures through quality engineering education.
          </p>
        </div>
      </section>

      {/* Our Legacy */}
      <section className="section">
        <div className="container">
          <div className="about-intro-grid">
            <div className="about-intro-text reveal-left reveal">
              <h2 className="section-title" style={{ textAlign: 'left' }}>Our Story</h2>
              <p>
                SoET is a University Teaching Department of Samrat Vikramaditya Vishwavidyalaya
                Ujjain established in 2011 under the faculty of Engineering. The institute provides
                technical education leading to the undergraduate degree of B.Tech and the
                postgraduate degree of M.Tech.
              </p>
              <p>
                Courses offered are sanctioned by the AICTE and the Department of Technical
                Education of the Government of Madhya Pradesh.
              </p>
            </div>
            <div className="about-vision-mission reveal-right reveal">
              <div className="vm-card">
                <div className="vm-icon"><Eye size={24} /></div>
                <h3>Our Vision</h3>
                <p>
                  Develop the technical culture through its programs by imparting the quality
                  technical education of dynamic knowledge and practical skills to the students.
                </p>
              </div>
              <div className="vm-card">
                <div className="vm-icon"><Target size={24} /></div>
                <h3>Our Mission</h3>
                <p>
                  Institute will mainly emphasize towards personality of students to enter the
                  engineering profession and to develop quality of leadership and provide the
                  social and moral values and pride for national heritage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section values-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Core Values</span>
            <h2 className="section-title">What We Stand For</h2>
          </div>
          <div className="values-grid">
            {coreValues.map((val, i) => (
              <div key={i} className="value-card">
                <div className="value-icon">{val.icon}</div>
                <h4>{val.title}</h4>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose SoET */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Why SoET</span>
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle">
              Discover what makes SoET the premier choice for engineering education.
            </p>
          </div>
          <div className="grid grid-3">
            {whyChoose.map((item, i) => (
              <div key={i} className="why-card">
                <div className="why-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Life */}
      <section className="section campus-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Campus Life</span>
            <h2 className="section-title">Experience a Vibrant Campus</h2>
            <p className="section-subtitle">
              Our campus offers a perfect blend of academic rigor and extracurricular activities, fostering holistic development of every student.
            </p>
          </div>
          <div className="campus-grid">
            <div className="campus-info reveal-left reveal">
              <div className="campus-features">
                {[
                  { icon: <FlaskConical size={24} />, title: 'Modern Laboratories', desc: '6 specialized labs with latest equipment' },
                  { icon: <BookOpen size={24} />, title: 'Digital Library', desc: '2500+ books and digital resources' },
                  { icon: <Users size={24} />, title: 'Student Societies', desc: 'Active clubs and societies' },
                  { icon: <Trophy size={24} />, title: 'Competitions', desc: 'Regular hackathons and tech events' },
                ].map((feat, i) => (
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

      {/* Timeline */}
      <section className="section timeline-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Journey</span>
            <h2 className="section-title">History & Milestones</h2>
          </div>
          <div className="timeline">
            {timeline.map((item, i) => (
              <div key={i} className={`timeline-item ${i % 2 === 0 ? 'tl-left' : 'tl-right'}`}>
                <div className="tl-dot" />
                <div className="tl-content">
                  <span className="tl-year">{item.year}</span>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Leadership</span>
            <h2 className="section-title">Our Leadership Team</h2>
          </div>
          <div className="leadership-grid">
            {leadership.map((leader, i) => (
              <div key={i} className={`leader-card ${i === 0 ? 'leader-featured' : ''}`}>
                <div className="leader-avatar">
                  <Users size={32} />
                </div>
                <h4>{leader.name}</h4>
                <span className="leader-title">{leader.designation}</span>
                <span className="leader-expertise">{leader.expertise}</span>
                <span className="leader-exp">{leader.experience} experience</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Stats */}
      <section className="faculty-stats-bar">
        <div className="container">
          <div className="stats-grid">
            {facultyStats.map((stat, i) => (
              <div key={i} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Research</span>
            <h2 className="section-title">Research Thrust Areas</h2>
          </div>
          <div className="research-tags">
            {researchAreas.map((area, i) => (
              <span key={i} className="research-tag">{area}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
