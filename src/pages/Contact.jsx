import { useState } from 'react';
import {
  Mail, Phone, MapPin, Clock, Send, Plane, Train, Bus, Car,
  CreditCard, Download, CalendarDays, HelpCircle, ExternalLink
} from 'lucide-react';
import { contactInfo, departmentContacts, directions, externalLinks } from '../data/siteData';
import { useRevealOnScroll } from '../lib/hooks';

const inquiryTypes = ['Admission', 'Academic', 'Placement', 'Facilities', 'Research', 'General', 'Other'];

const directionIcons = { plane: <Plane size={20} />, train: <Train size={20} />, bus: <Bus size={20} />, car: <Car size={20} /> };

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    inquiryType: 'General', subject: '', message: '', newsletter: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with Supabase
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const pageRef = useRevealOnScroll();

  return (
    <div className="contact-page" ref={pageRef}>
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Get in Touch</span>
          <h1 className="page-hero-title">Contact Us</h1>
          <p className="page-hero-desc">
            Have a question? We're here to help. Reach out to us anytime.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Info */}
            <div className="contact-info-col">
              <h3>Contact Information</h3>
              <div className="contact-items">
                <div className="ci-item">
                  <div className="ci-icon"><MapPin size={20} /></div>
                  <div>
                    <strong>Address</strong>
                    <p>{contactInfo.address.full}</p>
                  </div>
                </div>
                <div className="ci-item">
                  <div className="ci-icon"><Phone size={20} /></div>
                  <div>
                    <strong>Phone</strong>
                    <p>Main: <a href={`tel:${contactInfo.phones.main}`}>{contactInfo.phones.main}</a></p>
                    <p>Admissions: <a href={`tel:${contactInfo.phones.admission}`}>{contactInfo.phones.admission}</a></p>
                    <p>Dean: <a href={`tel:${contactInfo.phones.dean}`}>{contactInfo.phones.dean}</a></p>
                  </div>
                </div>
                <div className="ci-item">
                  <div className="ci-icon"><Mail size={20} /></div>
                  <div>
                    <strong>Email</strong>
                    <p><a href={`mailto:${contactInfo.emails.general}`}>{contactInfo.emails.general}</a></p>
                    <p><a href={`mailto:${contactInfo.emails.admissions}`}>{contactInfo.emails.admissions}</a></p>
                  </div>
                </div>
                <div className="ci-item">
                  <div className="ci-icon"><Clock size={20} /></div>
                  <div>
                    <strong>Office Hours</strong>
                    <p>{contactInfo.officeHours.weekdays}</p>
                    <p>{contactInfo.officeHours.saturday}</p>
                    <p>{contactInfo.officeHours.sunday}</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="quick-actions">
                <a href={externalLinks.feePayment} target="_blank" rel="noopener noreferrer" className="qa-btn">
                  <CreditCard size={16} /> Fee Payment
                </a>
                <a href={externalLinks.universityPortal} target="_blank" rel="noopener noreferrer" className="qa-btn">
                  <Download size={16} /> Brochure
                </a>
                <a href={externalLinks.googleMaps} target="_blank" rel="noopener noreferrer" className="qa-btn">
                  <MapPin size={16} /> Get Directions
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-col">
              <h3>Send us a Message</h3>
              {submitted ? (
                <div className="form-success">
                  <Send size={32} />
                  <h4>Message Sent!</h4>
                  <p>Thank you for reaching out. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name *</label>
                      <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label>Last Name *</label>
                      <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Inquiry Type</label>
                    <select name="inquiryType" value={form.inquiryType} onChange={handleChange}>
                      {inquiryTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Subject *</label>
                    <input type="text" name="subject" value={form.subject} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Message *</label>
                    <textarea name="message" rows={5} value={form.message} onChange={handleChange} required />
                  </div>
                  <div className="form-checkbox">
                    <input type="checkbox" id="newsletter" name="newsletter" checked={form.newsletter} onChange={handleChange} />
                    <label htmlFor="newsletter">Subscribe to newsletter for updates</label>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="section dept-contacts-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Departments</span>
            <h2 className="section-title">Department Contacts</h2>
          </div>
          <div className="grid grid-3">
            {departmentContacts.map((dept, i) => (
              <div key={i} className="dept-contact-card">
                <h4>{dept.name}</h4>
                <p><Phone size={14} /> <a href={`tel:${dept.phone}`}>{dept.phone}</a></p>
                <p><Mail size={14} /> <a href={`mailto:${dept.email}`}>{dept.email}</a></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Reach */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Directions</span>
            <h2 className="section-title">How to Reach Us</h2>
          </div>
          <div className="grid grid-4">
            {directions.map((dir, i) => (
              <div key={i} className="direction-card">
                <div className="dir-icon">{directionIcons[dir.icon]}</div>
                <h4>{dir.mode}</h4>
                <p>{dir.detail}</p>
              </div>
            ))}
          </div>
          {/* Campus View & Map Link */}
          <div className="map-campus-section">
            <img
              src="/images/College Pics/College/IMG-20241226-WA0010.jpg"
              alt="SoET Campus View"
              className="campus-map-img"
              loading="lazy"
            />
            <div className="map-overlay">
              <MapPin size={24} />
              <a href={externalLinks.googleMaps} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                View on Google Maps <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
