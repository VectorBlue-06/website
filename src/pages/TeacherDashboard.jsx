import { useState } from 'react';
import { Plus, Edit, Trash2, Upload, FileText, Calendar, Users, BookOpen } from 'lucide-react';
import './TeacherDashboard.css';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('events');

  const tabs = [
    { id: 'events', label: 'Events', icon: <Calendar size={16} /> },
    { id: 'timetable', label: 'Timetable', icon: <FileText size={16} /> },
    { id: 'programs', label: 'Programs', icon: <BookOpen size={16} /> },
    { id: 'notices', label: 'Notices', icon: <Users size={16} /> },
  ];

  return (
    <div className="dashboard-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Admin Panel</span>
          <h1 className="page-hero-title">Teacher Dashboard</h1>
          <p className="page-hero-desc">
            Manage website content, events, timetables, and more.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="dashboard-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`dashboard-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div className="dashboard-content">
            {activeTab === 'events' && <EventsManager />}
            {activeTab === 'timetable' && <TimetableManager />}
            {activeTab === 'programs' && <ProgramsManager />}
            {activeTab === 'notices' && <NoticesManager />}
          </div>
        </div>
      </section>
    </div>
  );
}

function EventsManager() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleAdd = () => {
    setEditingEvent(null);
    setShowForm(true);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div className="manager-section">
      <div className="manager-header">
        <h3>Manage Events</h3>
        <button className="btn btn-primary" onClick={handleAdd}>
          <Plus size={16} /> Add Event
        </button>
      </div>

      {showForm && (
        <EventForm
          event={editingEvent}
          onSave={(event) => {
            if (editingEvent) {
              setEvents(events.map(e => e.id === editingEvent.id ? event : e));
            } else {
              setEvents([...events, { ...event, id: Date.now() }]);
            }
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="items-list">
        {events.map(event => (
          <div key={event.id} className="item-card">
            <div className="item-info">
              <h4>{event.title}</h4>
              <p>{event.description}</p>
              <span>{event.date}</span>
            </div>
            <div className="item-actions">
              <button onClick={() => handleEdit(event)}><Edit size={16} /></button>
              <button onClick={() => handleDelete(event.id)}><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventForm({ event, onSave, onCancel }) {
  const [formData, setFormData] = useState(event || {
    title: '',
    description: '',
    date: '',
    image: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
      </div>
    </form>
  );
}

function TimetableManager() {
  return (
    <div className="manager-section">
      <div className="manager-header">
        <h3>Manage Timetable</h3>
        <button className="btn btn-primary">
          <Upload size={16} /> Upload PDF
        </button>
      </div>
      <p>Timetable management functionality will be implemented here.</p>
    </div>
  );
}

function ProgramsManager() {
  return (
    <div className="manager-section">
      <div className="manager-header">
        <h3>Manage Programs & Info</h3>
        <button className="btn btn-primary">
          <Plus size={16} /> Add Program
        </button>
      </div>
      <p>Programs management functionality will be implemented here.</p>
    </div>
  );
}

function NoticesManager() {
  return (
    <div className="manager-section">
      <div className="manager-header">
        <h3>Manage Notices</h3>
        <button className="btn btn-primary">
          <Plus size={16} /> Add Notice
        </button>
      </div>
      <p>Notices management functionality will be implemented here.</p>
    </div>
  );
}