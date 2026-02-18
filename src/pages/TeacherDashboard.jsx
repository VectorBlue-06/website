import { useState } from 'react';
import { Calendar, FileText, BookOpen, Bell } from 'lucide-react';
import { CrudManager } from '../components/CrudManager';

const eventFields = [
  { key: 'title', label: 'Title', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea', required: true },
  { key: 'date', label: 'Date', type: 'date', required: true },
  { key: 'type', label: 'Category', type: 'select', options: ['academic', 'cultural', 'social'], required: true },
  { key: 'participants', label: 'Participants', type: 'text' },
  { key: 'image', label: 'Image URL', type: 'text' },
];

const noticeFields = [
  { key: 'title', label: 'Title', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea', required: true },
  { key: 'date', label: 'Date', type: 'date', required: true },
  { key: 'priority', label: 'Priority', type: 'select', options: ['normal', 'high', 'urgent'], required: true },
  { key: 'category', label: 'Category', type: 'select', options: ['academic', 'administrative', 'examination', 'general'] },
];

const timetableFields = [
  { key: 'title', label: 'Title', type: 'text', required: true },
  { key: 'department', label: 'Department', type: 'select', options: ['Electronics & Communication', 'Electronics & Computer Science', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Computer Science', 'Agricultural Engineering'], required: true },
  { key: 'semester', label: 'Semester', type: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8'], required: true },
  { key: 'academicYear', label: 'Academic Year', type: 'text', required: true },
  { key: 'description', label: 'Details / Notes', type: 'textarea' },
];

const programFields = [
  { key: 'name', label: 'Program Name', type: 'text', required: true },
  { key: 'shortName', label: 'Short Name', type: 'text', required: true },
  { key: 'intake', label: 'Intake', type: 'number', required: true },
  { key: 'duration', label: 'Duration', type: 'text', required: true },
  { key: 'eligibility', label: 'Eligibility', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea' },
];

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('events');

  const tabs = [
    { id: 'events', label: 'Events', icon: <Calendar size={16} /> },
    { id: 'notices', label: 'Notices', icon: <Bell size={16} /> },
    { id: 'timetable', label: 'Timetable', icon: <FileText size={16} /> },
    { id: 'programs', label: 'Programs', icon: <BookOpen size={16} /> },
  ];

  return (
    <div className="dashboard-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Teacher Panel</span>
          <h1 className="page-hero-title">Teacher Dashboard</h1>
          <p className="page-hero-desc">
            Manage events, notices, timetables, and programs.
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
            {activeTab === 'events' && <CrudManager type="events" fields={eventFields} />}
            {activeTab === 'notices' && <CrudManager type="notices" fields={noticeFields} />}
            {activeTab === 'timetable' && <CrudManager type="timetable" fields={timetableFields} />}
            {activeTab === 'programs' && <CrudManager type="programs" fields={programFields} />}
          </div>
        </div>
      </section>
    </div>
  );
}