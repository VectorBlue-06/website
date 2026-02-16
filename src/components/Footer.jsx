import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, ArrowUp, ExternalLink } from 'lucide-react';
import { siteConfig, contactInfo, socialLinks, externalLinks } from '../data/siteData';
import './Footer.css';

const footerLinks = {
  quickLinks: [
    { label: 'About Us', path: '/about' },
    { label: 'Departments', path: '/departments' },
    { label: 'Faculty', path: '/faculty' },
    { label: 'Admissions', path: '/admissions' },
    { label: 'Events', path: '/events' },
    { label: 'Contact', path: '/contact' },
  ],
  resources: [
    { label: 'University Portal', url: externalLinks.universityPortal },
    { label: 'Fee Payment', url: externalLinks.feePayment },
    { label: 'Exam Results', url: externalLinks.examResults },
    { label: 'Academic Calendar', url: externalLinks.academicCalendar },
    { label: 'AICTE', url: externalLinks.aicte },
  ],
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img
                src="/images/vikram-university-Photoroom.png"
                alt="SoET Logo"
                className="footer-logo-img"
              />
              <div>
                <h3>{siteConfig.name}</h3>
                <p>{siteConfig.fullName}</p>
              </div>
            </div>
            <p className="footer-desc">
              {siteConfig.university} — Premier destination for engineering excellence, research, and holistic development.
            </p>
            <div className="footer-social">
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter size={18} /></a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              {footerLinks.quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              {footerLinks.resources.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label} <ExternalLink size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <MapPin size={16} />
                <span>{contactInfo.address.line1}, {contactInfo.address.line3}</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <a href={`tel:${contactInfo.phones.main}`}>{contactInfo.phones.main}</a>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <a href={`mailto:${contactInfo.emails.general}`}>{contactInfo.emails.general}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {siteConfig.fullName}, {siteConfig.university}. All rights reserved.
          </p>
          <p className="footer-credit">
            Built with ❤️ by <a href={siteConfig.madeBy.url} target="_blank" rel="noopener noreferrer">{siteConfig.madeBy.name}</a>
          </p>
        </div>
      </div>

      <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}
