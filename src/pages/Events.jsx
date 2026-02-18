import { useState, useEffect, useMemo } from 'react';
import { Calendar, Users, BookOpen, Sparkles } from 'lucide-react';
import { activities } from '../data/activities';

export default function Events() {
  const [sortBy, setSortBy] = useState('date');
  const [events, setEvents] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', label: 'All', icon: <Sparkles size={16} /> },
    { id: 'academic', label: 'Academic', icon: <BookOpen size={16} /> },
    { id: 'cultural', label: 'Cultural', icon: <Users size={16} /> },
    { id: 'social', label: 'Social', icon: <Calendar size={16} /> },
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/events');
      const data = await response.json();
      const normalized = normalizeEvents(data);
      if (normalized.length) {
        setEvents(normalized);
      } else {
        setEvents(buildFallbackEvents());
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents(buildFallbackEvents());
    } finally {
      setLoading(false);
    }
  };

  const normalizeEvents = (data) => data.map((event, idx) => ({
    id: event.id || idx,
    title: event.title || 'Untitled Event',
    description: event.description || '',
    date: event.date || '',
    participants: event.participants,
    type: event.type || event.category || 'academic',
  }));

  const buildFallbackEvents = () => ([
    ...activities.academic.map((item, idx) => ({ ...item, id: `academic-${idx}`, type: 'academic' })),
    ...activities.cultural.map((item, idx) => ({ ...item, id: `cultural-${idx}`, type: 'cultural' })),
    ...activities.social.map((item, idx) => ({ ...item, id: `social-${idx}`, type: 'social' })),
  ]);

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date) - new Date(b.date);
      }
      if (sortBy === 'upload') {
        return new Date(b.id) - new Date(a.id);
      }
      return 0;
    });
  }, [events, sortBy]);

  const visibleEvents = useMemo(() => {
    if (activeCategory === 'all') return sortedEvents;
    return sortedEvents.filter((event) => (event.type || 'academic') === activeCategory);
  }, [activeCategory, sortedEvents]);

  const eventCardClass = (type) => {
    if (type === 'cultural') return 'event-card cultural-card';
    if (type === 'social') return 'event-card social-card';
    return 'event-card';
  };

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
          <div className="events-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`event-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          <div className="events-controls">
            <label htmlFor="sort-select">Sort by:</label>
            <select id="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">Event Date</option>
              <option value="upload">Upload Date</option>
            </select>
          </div>

          {loading ? (
            <p>Loading events...</p>
          ) : (
            <div className="events-grid">
              {visibleEvents.map((event, i) => (
                <div key={event.id || i} className={eventCardClass(event.type)}>
                  <div className="event-card-top">
                    <BookOpen size={20} />
                    <span className="event-date"><Calendar size={13} /> {event.date || 'TBA'}</span>
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
              {!visibleEvents.length && (
                <div className="event-card" style={{ gridColumn: '1 / -1' }}>
                  <h4>No events in this category yet.</h4>
                  <p>Check back soon for updates.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
