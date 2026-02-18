const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data files
const EVENTS_FILE = path.join(__dirname, 'events.json');
const NOTICES_FILE = path.join(__dirname, 'notices.json');
const TIMETABLE_FILE = path.join(__dirname, 'timetable.json');
const PROGRAMS_FILE = path.join(__dirname, 'programs.json');
const SITE_CONFIG_FILE = path.join(__dirname, 'siteConfig.json');
const FACULTY_FILE = path.join(__dirname, 'faculty.json');
const STATS_FILE = path.join(__dirname, 'stats.json');
const PLACEMENTS_FILE = path.join(__dirname, 'placements.json');

// Helper functions
function readData(file) {
  try {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
}

function writeData(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data:', error);
  }
}

// Routes

// Events
app.get('/api/events', (req, res) => {
  const events = readData(EVENTS_FILE);
  res.json(events);
});

app.post('/api/events', (req, res) => {
  const events = readData(EVENTS_FILE);
  const newEvent = { ...req.body, id: Date.now() };
  events.push(newEvent);
  writeData(EVENTS_FILE, events);
  res.json({ id: newEvent.id });
});

app.put('/api/events/:id', (req, res) => {
  const events = readData(EVENTS_FILE);
  const index = events.findIndex(e => e.id == req.params.id);
  if (index !== -1) {
    events[index] = { ...req.body, id: parseInt(req.params.id) };
    writeData(EVENTS_FILE, events);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Event not found' });
  }
});

app.delete('/api/events/:id', (req, res) => {
  const events = readData(EVENTS_FILE);
  const filtered = events.filter(e => e.id != req.params.id);
  writeData(EVENTS_FILE, filtered);
  res.json({ success: true });
});

// Notices
app.get('/api/notices', (req, res) => {
  const notices = readData(NOTICES_FILE);
  res.json(notices);
});

app.post('/api/notices', (req, res) => {
  const notices = readData(NOTICES_FILE);
  const newNotice = { ...req.body, id: Date.now() };
  notices.push(newNotice);
  writeData(NOTICES_FILE, notices);
  res.json({ id: newNotice.id });
});

app.put('/api/notices/:id', (req, res) => {
  const notices = readData(NOTICES_FILE);
  const index = notices.findIndex(n => n.id == req.params.id);
  if (index !== -1) {
    notices[index] = { ...req.body, id: parseInt(req.params.id) };
    writeData(NOTICES_FILE, notices);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Notice not found' });
  }
});

app.delete('/api/notices/:id', (req, res) => {
  const notices = readData(NOTICES_FILE);
  const filtered = notices.filter(n => n.id != req.params.id);
  writeData(NOTICES_FILE, filtered);
  res.json({ success: true });
});

// Timetable
app.get('/api/timetable', (req, res) => {
  const timetable = readData(TIMETABLE_FILE);
  res.json(timetable);
});

app.post('/api/timetable', (req, res) => {
  const timetable = readData(TIMETABLE_FILE);
  const newEntry = { ...req.body, id: Date.now() };
  timetable.push(newEntry);
  writeData(TIMETABLE_FILE, timetable);
  res.json({ id: newEntry.id });
});

app.put('/api/timetable/:id', (req, res) => {
  const timetable = readData(TIMETABLE_FILE);
  const index = timetable.findIndex(e => e.id == req.params.id);
  if (index !== -1) {
    timetable[index] = { ...req.body, id: parseInt(req.params.id) };
    writeData(TIMETABLE_FILE, timetable);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Timetable entry not found' });
  }
});

app.delete('/api/timetable/:id', (req, res) => {
  const timetable = readData(TIMETABLE_FILE);
  const filtered = timetable.filter(e => e.id != req.params.id);
  writeData(TIMETABLE_FILE, filtered);
  res.json({ success: true });
});

// Programs
app.get('/api/programs', (req, res) => {
  const programs = readData(PROGRAMS_FILE);
  res.json(programs);
});

app.post('/api/programs', (req, res) => {
  const programs = readData(PROGRAMS_FILE);
  const newProgram = { ...req.body, id: Date.now() };
  programs.push(newProgram);
  writeData(PROGRAMS_FILE, programs);
  res.json({ id: newProgram.id });
});

app.put('/api/programs/:id', (req, res) => {
  const programs = readData(PROGRAMS_FILE);
  const index = programs.findIndex(e => e.id == req.params.id);
  if (index !== -1) {
    programs[index] = { ...req.body, id: parseInt(req.params.id) };
    writeData(PROGRAMS_FILE, programs);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Program not found' });
  }
});

app.delete('/api/programs/:id', (req, res) => {
  const programs = readData(PROGRAMS_FILE);
  const filtered = programs.filter(e => e.id != req.params.id);
  writeData(PROGRAMS_FILE, filtered);
  res.json({ success: true });
});

// Site Config (frontend variables like stats, contact info, etc.)
app.get('/api/site-config', (req, res) => {
  const config = readData(SITE_CONFIG_FILE);
  res.json(config);
});

app.put('/api/site-config', (req, res) => {
  writeData(SITE_CONFIG_FILE, req.body);
  res.json({ success: true });
});

// Stats
app.get('/api/stats', (req, res) => {
  const stats = readData(STATS_FILE);
  res.json(stats);
});

app.put('/api/stats', (req, res) => {
  writeData(STATS_FILE, req.body);
  res.json({ success: true });
});

// Faculty
app.get('/api/faculty', (req, res) => {
  const faculty = readData(FACULTY_FILE);
  res.json(faculty);
});

app.post('/api/faculty', (req, res) => {
  const faculty = readData(FACULTY_FILE);
  const newFaculty = { ...req.body, id: Date.now() };
  faculty.push(newFaculty);
  writeData(FACULTY_FILE, faculty);
  res.json({ id: newFaculty.id });
});

app.put('/api/faculty/:id', (req, res) => {
  const faculty = readData(FACULTY_FILE);
  const index = faculty.findIndex(f => f.id == req.params.id);
  if (index !== -1) {
    faculty[index] = { ...req.body, id: parseInt(req.params.id) };
    writeData(FACULTY_FILE, faculty);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Faculty not found' });
  }
});

app.delete('/api/faculty/:id', (req, res) => {
  const faculty = readData(FACULTY_FILE);
  const filtered = faculty.filter(f => f.id != req.params.id);
  writeData(FACULTY_FILE, filtered);
  res.json({ success: true });
});

// Placements
app.get('/api/placements', (req, res) => {
  const placements = readData(PLACEMENTS_FILE);
  res.json(placements);
});

app.post('/api/placements', (req, res) => {
  const placements = readData(PLACEMENTS_FILE);
  const newPlacement = { ...req.body, id: Date.now() };
  placements.push(newPlacement);
  writeData(PLACEMENTS_FILE, placements);
  res.json({ id: newPlacement.id });
});

app.put('/api/placements/:id', (req, res) => {
  const placements = readData(PLACEMENTS_FILE);
  const index = placements.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    placements[index] = { ...req.body, id: parseInt(req.params.id) };
    writeData(PLACEMENTS_FILE, placements);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Placement not found' });
  }
});

app.delete('/api/placements/:id', (req, res) => {
  const placements = readData(PLACEMENTS_FILE);
  const filtered = placements.filter(p => p.id != req.params.id);
  writeData(PLACEMENTS_FILE, filtered);
  res.json({ success: true });
});

// Basic auth
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'teacher' && password === 'password') {
    res.json({ success: true, role: 'teacher' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/admin-login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    res.json({ success: true, role: 'admin' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});