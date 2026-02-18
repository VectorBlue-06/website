import { Link } from 'react-router-dom';
import {
  Building, Cog, Zap, Radio, Cpu, Sprout,
  Clock, Users, GraduationCap, ArrowRight, BookOpen
} from 'lucide-react';
import { btechPrograms, mtechPrograms } from '../data/academics';
import { useRevealOnScroll } from '../lib/hooks';

const iconMap = {
  building: <Building size={28} />,
  cog: <Cog size={28} />,
  zap: <Zap size={28} />,
  radio: <Radio size={28} />,
  cpu: <Cpu size={28} />,
  sprout: <Sprout size={28} />,
};

export default function Departments() {
  const pageRef = useRevealOnScroll();

  return (
    <div className="departments-page" ref={pageRef}>
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Academics</span>
          <h1 className="page-hero-title">Our Departments</h1>
          <p className="page-hero-desc">
            6 Engineering Departments offering 11 programs with 2000+ students.
          </p>
        </div>
      </section>

      {/* B.Tech Programs */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-badge">Undergraduate</span>
            <h2 className="section-title">B.Tech Programs</h2>
            <p className="section-subtitle">
              4-year undergraduate programs designed for industry-ready engineers.
            </p>
          </div>
          <div className="dept-grid">
            {btechPrograms.map((prog) => (
              <div key={prog.id} className="dept-card reveal">
                <div className="dept-card-header">
                  <div className="dept-icon">{iconMap[prog.icon]}</div>
                  <span className="dept-badge">{prog.shortName}</span>
                </div>
                <h3>{prog.name}</h3>
                <p className="dept-desc">{prog.description}</p>
                <div className="dept-meta">
                  <span><Users size={14} /> Intake: {prog.intake}</span>
                  <span><Clock size={14} /> {prog.duration}</span>
                </div>
                <div className="dept-subjects">
                  <h5><BookOpen size={14} /> Key Subjects</h5>
                  <div className="subject-tags">
                    {prog.subjects.slice(0, 4).map((sub, i) => (
                      <span key={i} className="subject-tag">{sub}</span>
                    ))}
                  </div>
                </div>
                <div className="dept-eligibility">
                  <GraduationCap size={14} />
                  <span>{prog.eligibility}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* M.Tech Programs */}
      <section className="section mtech-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-badge">Postgraduate</span>
            <h2 className="section-title">M.Tech Programs</h2>
            <p className="section-subtitle">
              2-year postgraduate programs for advanced specialization and research.
            </p>
          </div>
          <div className="mtech-grid">
            {mtechPrograms.map((prog) => (
              <div key={prog.id} className="mtech-card reveal">
                <h4>{prog.name}</h4>
                <p className="mtech-dept">{prog.department}</p>
                <div className="dept-meta">
                  <span><Users size={14} /> Intake: {prog.intake}</span>
                  <span><Clock size={14} /> {prog.duration}</span>
                </div>
                <span className="mtech-elig">{prog.eligibility}</span>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <Link to="/admissions" className="btn btn-primary">
              Apply Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
