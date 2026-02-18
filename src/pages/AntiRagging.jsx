import {
  Shield, AlertTriangle, Phone, Mail, ExternalLink, FileText
} from 'lucide-react';
import { useRevealOnScroll } from '../lib/hooks';

const posters = [
  {
    src: '/src/assets/antiragging-poster1.jpg',
    alt: 'Anti-Ragging Poster 1',
  },
  {
    src: '/src/assets/antiragging-poster2.jpg',
    alt: 'Anti-Ragging Poster 2',
  },
];

export default function AntiRagging() {
  const pageRef = useRevealOnScroll();

  return (
    <div className="about-page" ref={pageRef}>
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Anti-Ragging</span>
          <h1 className="page-hero-title">Zero Tolerance for Ragging</h1>
          <p className="page-hero-desc">
            Ensuring a safe and respectful environment for all students.
          </p>
        </div>
      </section>

      {/* Anti-Ragging Policy */}
      <section className="section">
        <div className="container">
          <div className="anti-ragging-content">
            <div className="anti-ragging-text">
              <h2>Our Commitment</h2>
              <p>
                SoET follows a zero-tolerance anti-ragging policy. Every student deserves a safe, respectful, and inclusive campus. Speak up—support is immediate and confidential.
              </p>

              <h3>What Counts as Ragging?</h3>
              <ul className="rules-list">
                <li>Any act that intimidates, humiliates, or harasses juniors or peers.</li>
                <li>Forcing unwanted tasks, payments, or sharing personal data.</li>
                <li>Physical harm, threats, online bullying, or obstructing academics.</li>
                <li>Using power dynamics to shame, isolate, or control another student.</li>
              </ul>

              <h3>Consequences</h3>
              <ul className="consequences-list">
                <li>Immediate suspension of campus privileges and hostel access.</li>
                <li>Academic penalties, fines up to ₹25,000, and legal action per UGC norms.</li>
                <li>Rustication/expulsion and debarment from examinations or representation.</li>
              </ul>

              <h3>Report Immediately</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <Shield size={20} />
                  <div>
                    <strong>Anti-Ragging Committee</strong>
                    <p>Contact immediately if you face any ragging</p>
                  </div>
                </div>
                <div className="contact-item">
                  <Phone size={20} />
                  <div>
                    <strong>Helpline:</strong>
                    <p>+91 734-2514271 (Dean Office)</p>
                  </div>
                </div>
                <div className="contact-item">
                  <Mail size={20} />
                  <div>
                    <strong>Email:</strong>
                    <p>antiragging@vikramuniv.ac.in</p>
                  </div>
                </div>
              </div>

              <h3>Important Links</h3>
              <div className="links-list">
                <a href="https://www.ugc.ac.in/page/UGC-Regulations-on-Curbing-the-Menace-of-Ragging-in-Higher-Educational-Institutions.aspx" target="_blank" rel="noopener noreferrer">
                  <FileText size={16} /> UGC Anti-Ragging Regulations
                </a>
                <a href="https://vikramuniv.ac.in/page/anti-ragging" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} /> University Anti-Ragging Policy
                </a>
                <a href="https://www.aicte-india.org/feedback/ragging" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} /> AICTE Anti-Ragging Portal
                </a>
              </div>
            </div>
            <div className="anti-ragging-poster">
              <div className="poster-grid">
                {posters.map((poster) => (
                  <img
                    key={poster.src}
                    src={poster.src}
                    alt={poster.alt}
                    className="poster-image"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}