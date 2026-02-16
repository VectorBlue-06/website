export const btechPrograms = [
  {
    id: 'civil',
    name: 'Civil Engineering',
    shortName: 'CE',
    intake: 54,
    duration: '4 Years',
    eligibility: 'JEE Mains / 12th PCM',
    description: 'Study structural engineering, construction management, environmental engineering, and infrastructure development.',
    icon: 'building',
    subjects: ['Structural Analysis', 'Geotechnical Engineering', 'Transportation Engineering', 'Environmental Engineering', 'Construction Management', 'Surveying'],
  },
  {
    id: 'mechanical',
    name: 'Mechanical Engineering',
    shortName: 'ME',
    intake: 60,
    duration: '4 Years',
    eligibility: 'JEE Mains / 12th PCM',
    description: 'Explore manufacturing, robotics, automation, thermal systems, and advanced mechanical design.',
    icon: 'cog',
    subjects: ['Thermodynamics', 'Manufacturing Processes', 'Machine Design', 'Fluid Mechanics', 'Robotics', 'CAD/CAM'],
  },
  {
    id: 'electrical',
    name: 'Electrical Engineering',
    shortName: 'EE',
    intake: 54,
    duration: '4 Years',
    eligibility: 'JEE Mains / 12th PCM',
    description: 'Master power systems, renewable energy, smart grid technologies, and electrical machine design.',
    icon: 'zap',
    subjects: ['Power Systems', 'Electrical Machines', 'Control Systems', 'Renewable Energy', 'Smart Grid', 'Power Electronics'],
  },
  {
    id: 'ece',
    name: 'Electronics & Communication',
    shortName: 'ECE',
    intake: 54,
    duration: '4 Years',
    eligibility: 'JEE Mains / 12th PCM',
    description: 'Dive into communication systems, VLSI design, signal processing, and embedded systems.',
    icon: 'radio',
    subjects: ['Digital Communication', 'VLSI Design', 'Signal Processing', 'Microprocessors', 'Antenna Engineering', 'Embedded Systems'],
  },
  {
    id: 'ecs',
    name: 'Electronics & Computer Science',
    shortName: 'ECS',
    intake: 54,
    duration: '4 Years',
    eligibility: 'JEE Mains / 12th PCM',
    description: 'Combine electronics with computing — AI, ML, IoT, and next-generation computing technologies.',
    icon: 'cpu',
    subjects: ['Artificial Intelligence', 'Machine Learning', 'IoT', 'Data Structures', 'Computer Networks', 'Cloud Computing'],
  },
  {
    id: 'agri',
    name: 'Agricultural Engineering',
    shortName: 'AG',
    intake: 30,
    duration: '4 Years',
    eligibility: '12th (PCB, PCM & Agriculture)',
    description: 'Apply engineering principles to agriculture — irrigation, farm machinery, food processing, and sustainable farming.',
    icon: 'sprout',
    subjects: ['Farm Machinery', 'Irrigation Engineering', 'Food Processing', 'Soil & Water Conservation', 'Precision Agriculture', 'Agricultural Processing'],
  },
];

export const mtechPrograms = [
  { id: 'structural', name: 'Structural Engineering', intake: 20, duration: '2 Years', eligibility: 'B.Tech (Civil)', department: 'Civil Engineering' },
  { id: 'thermal', name: 'Thermal Engineering', intake: 20, duration: '2 Years', eligibility: 'B.Tech (Mechanical)', department: 'Mechanical Engineering' },
  { id: 'power', name: 'Power System & Automation', intake: 20, duration: '2 Years', eligibility: 'B.Tech (Electrical)', department: 'Electrical Engineering' },
  { id: 'digital-comm', name: 'Digital Communication', intake: 20, duration: '2 Years', eligibility: 'B.Tech (ECE/ECS)', department: 'Electronics & Communication' },
  { id: 'iot', name: 'IoT & Sensor Systems', intake: 20, duration: '2 Years', eligibility: 'B.Tech (ECE/ECS)', department: 'Electronics & Computer Science' },
];

export const admissionProcess = [
  { step: 1, title: 'Online Application', description: 'Submit your application through the university admission portal with required documents.' },
  { step: 2, title: 'Entrance Examination', description: 'Appear for JEE Main / State CET or university entrance examination.' },
  { step: 3, title: 'Counseling', description: 'Attend the counseling session for seat allotment based on merit and preferences.' },
  { step: 4, title: 'Admission Confirmation', description: 'Complete the admission process by submitting documents and paying the fees.' },
];

export const eligibility = {
  btech: {
    education: '12th with PCM, min 45% (40% reserved categories)',
    entrance: 'JEE Main / State CET',
  },
  mtech: {
    education: 'B.Tech/B.E., min 50% (45% reserved categories)',
    entrance: 'GATE preferred',
  },
};
