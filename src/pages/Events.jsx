import { Calendar, Users, BookOpen } from 'lucide-react';
import { activities } from '../data/activities';
import './Events.css';

export default function Events() {

  return (
    <div className="events-page">
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
          {/* Events */}
          <div className="events-grid">
            {activities.academic.map((event, i) => (
              <div key={i} className="event-card">
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
        </div>
      </section>
    </div>
  );
}
