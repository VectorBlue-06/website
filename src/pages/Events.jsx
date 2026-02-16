import { useState } from 'react';
import {
  Calendar, Users, Award, BookOpen, Heart, Trophy,
  Dumbbell, Music, Palette, TreePine
} from 'lucide-react';
import { activities } from '../data/activities';
import { useRevealOnScroll } from '../lib/hooks';
import './Events.css';

const tabs = [
  { id: 'academic', label: 'Academic', icon: <BookOpen size={16} /> },
  { id: 'cultural', label: 'Cultural', icon: <Music size={16} /> },
  { id: 'social', label: 'Social', icon: <Heart size={16} /> },
  { id: 'sports', label: 'Sports', icon: <Dumbbell size={16} /> },
];

export default function Events() {
  const [activeTab, setActiveTab] = useState('academic');
  const pageRef = useRevealOnScroll();

  return (
    <div className="events-page" ref={pageRef}>
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Campus Life</span>
          <h1 className="page-hero-title">Events & Activities</h1>
          <p className="page-hero-desc">
            Discover the vibrant campus life at SoET through academic, cultural, social, and sports activities.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Tabs */}
          <div className="events-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`event-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Academic */}
          {activeTab === 'academic' && (
            <div className="events-grid">
              {activities.academic.map((event, i) => (
                <div key={i} className="event-card reveal">
                  <div className="event-card-top">
                    <BookOpen size={20} />
                    <span className="event-date"><Calendar size={13} /> {event.date}</span>
                  </div>
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                  {event.participants && (
                    <span className="event-participants">
                      <Users size={13} /> {event.participants} participants
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Cultural */}
          {activeTab === 'cultural' && (
            <div className="events-grid">
              {activities.cultural.map((event, i) => (
                <div key={i} className="event-card cultural-card reveal">
                  <div className="event-card-top">
                    <Music size={20} />
                    <span className="event-date"><Calendar size={13} /> {event.date}</span>
                  </div>
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Social */}
          {activeTab === 'social' && (
            <div className="events-grid">
              {activities.social.map((event, i) => (
                <div key={i} className="event-card social-card reveal">
                  <div className="event-card-top">
                    <Heart size={20} />
                    <span className="event-date"><Calendar size={13} /> {event.date}</span>
                  </div>
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Sports */}
          {activeTab === 'sports' && (
            <div className="sports-content">
              <div className="sports-section-group">
                <h3><Trophy size={20} /> Outdoor Sports</h3>
                <div className="sports-tags">
                  {activities.sports.filter(s => s.category === 'outdoor').map((s, i) => (
                    <span key={i} className="sport-tag">{s.title}</span>
                  ))}
                </div>
              </div>
              <div className="sports-section-group">
                <h3><Palette size={20} /> Indoor Activities</h3>
                <div className="sports-tags">
                  {activities.sports.filter(s => s.category === 'indoor').map((s, i) => (
                    <span key={i} className="sport-tag">{s.title}</span>
                  ))}
                </div>
              </div>
              <div className="sports-section-group">
                <h3><TreePine size={20} /> Wellness</h3>
                <div className="sports-tags">
                  {activities.sports.filter(s => s.category === 'wellness').map((s, i) => (
                    <span key={i} className="sport-tag">{s.title}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
