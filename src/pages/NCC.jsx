import { useState, useEffect } from 'react';
import { Shield, Target, Users, Award, Heart, Star, ChevronRight, Phone } from 'lucide-react';
import { useRevealOnScroll } from '../lib/hooks';
import nccLogo from '../assets/ncc/ncc-logo.png';
import nccBg from '../assets/ncc/ncc-bg.avif';

const whyJoinNCC = [
  { icon: <Shield size={28} />, title: 'Discipline & Character', desc: 'NCC transforms ordinary students into disciplined, confident leaders. The rigorous yet rewarding training instills values that last a lifetime.' },
  { icon: <Target size={28} />, title: 'Adventure & Thrills', desc: 'From trekking camps to parasailing, rock climbing to firing ranges — NCC offers adventures most people only dream about.' },
  { icon: <Users size={28} />, title: 'Brotherhood & Unity', desc: 'The bonds forged in NCC are unbreakable. You become part of a family that stands together through thick and thin.' },
  { icon: <Award size={28} />, title: 'Career Advantage', desc: 'NCC \'C\' certificate holders get reservation in armed forces, CAPF, and government jobs. Your NCC journey opens doors that remain closed for others.' },
  { icon: <Heart size={28} />, title: 'Serve Your Nation', desc: 'There is no greater pride than serving your country. NCC gives you the platform to contribute to society through blood donation camps, disaster relief, and community service.' },
  { icon: <Star size={28} />, title: 'Scholarships & Benefits', desc: 'NCC cadets receive special scholarships, travel opportunities, Republic Day Camp selections, and a chance to represent at national and international events.' },
];

const nccActivities = [
  'Annual Training Camps (ATC)',
  'Combined Annual Training Camp (CATC)',
  'Republic Day Camp (RDC), New Delhi',
  'Thal Sainik Camp',
  'Social Service Camps',
  'Blood Donation Drives',
  'Tree Plantation Drives',
  'Independence Day & Republic Day Parades',
  'Weapon Training & Firing',
  'Map Reading & Navigation',
  'Disaster Management Training',
  'Adventure Activities — Trekking, Rock Climbing, Parasailing',
];

export default function NCC() {
  const pageRef = useRevealOnScroll();
  const [nccPhone, setNccPhone] = useState('+91 98765 43210');

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch('/api/site-config');
        const data = await res.json();
        if (data?.phoneNCC) setNccPhone(data.phoneNCC);
      } catch (err) { /* use default */ }
    };
    fetchContact();
  }, []);

  return (
    <div className="ncc-page" ref={pageRef}>
      {/* Hero with NCC Background */}
      <section className="ncc-hero" style={{ backgroundImage: `url(${nccBg})` }}>
        <div className="ncc-hero-overlay" />
        <div className="container ncc-hero-content">
          <img src={nccLogo} alt="NCC Logo" className="ncc-logo" />
          <h1 className="ncc-hero-title">National Cadet Corps</h1>
          <p className="ncc-hero-motto">&ldquo;Unity and Discipline&rdquo;</p>
          <p className="ncc-hero-desc">
            The largest uniformed youth organisation in the world. Join the force that
            shapes leaders, builds character, and serves the nation with pride.
          </p>
        </div>
      </section>

      {/* Motivational Intro */}
      <section className="section">
        <div className="container">
          <div className="ncc-intro reveal">
            <h2 className="section-title">Why NCC?</h2>
            <p className="ncc-quote">
              &ldquo;A nation&rsquo;s strength lies not in its weapons, but in the character of its youth.&rdquo;
            </p>
            <p>
              At the School of Engineering and Technology, NCC is not just an extracurricular activity —
              it is a way of life. Our cadets don&rsquo;t just attend classes; they march towards
              greatness. They don&rsquo;t just learn theories; they practice courage, patriotism, and
              selfless service every single day.
            </p>
            <p>
              Whether you dream of wearing the olive green, or you simply want to become a stronger,
              more disciplined version of yourself — NCC is your launchpad. Every drill, every camp,
              every parade brings you one step closer to the best version of yourself.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="section ncc-why-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-badge">Transform Yourself</span>
            <h2 className="section-title">Why You Should Join NCC</h2>
            <p className="section-subtitle">
              Every great leader was once a cadet. Your transformation begins here.
            </p>
          </div>
          <div className="grid grid-3">
            {whyJoinNCC.map((item, i) => (
              <div key={i} className={`card ncc-card reveal delay-${(i % 3) + 1}`}>
                <div className="ncc-card-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-badge">Activities & Training</span>
            <h2 className="section-title">What Awaits You</h2>
          </div>
          <div className="ncc-activities-grid reveal">
            {nccActivities.map((activity, i) => (
              <div key={i} className="ncc-activity-item">
                <ChevronRight size={16} />
                <span>{activity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="ncc-cta-section">
        <div className="container">
          <div className="ncc-cta reveal">
            {/* <img src={nccLogo} alt="NCC" className="ncc-cta-logo" /> */}
            <h2>Ready to Answer the Call?</h2>
            <p>
              Don&rsquo;t let this opportunity pass you by. Join NCC at SoET and become part of
              something bigger than yourself. The uniform is not just cloth — it&rsquo;s a symbol
              of pride, courage, and an unwavering commitment to India.
            </p>
            <div className="ncc-contact">
              <Phone size={20} />
              <div>
                <span className="ncc-contact-label">NCC Coordinator Contact</span>
                <a href={`tel:${nccPhone.replace(/\s/g, '')}`} className="ncc-contact-phone">{nccPhone}</a>
              </div>
            </div>
            <p className="ncc-tagline">
              <strong>&ldquo;Jai Hind!&rdquo;</strong> — The journey of a hero begins with a single step. Take yours today.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}