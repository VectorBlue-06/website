import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Placements from './pages/Placements';
import AntiRagging from './pages/AntiRagging';
import NCC from './pages/NCC';
import VCVision from './pages/VCVision';
import Departments from './pages/Departments';
import Faculty from './pages/Faculty';
import Admissions from './pages/Admissions';
import Notices from './pages/Notices';
import Contact from './pages/Contact';
import Events from './pages/Events';
import Societies from './pages/Societies';
import StudentLogin from './pages/StudentLogin';
import TeacherLogin from './pages/TeacherLogin';
import AdminLogin from './pages/AdminLogin';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SiteMap from './pages/SiteMap';
import './styles/global.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="placements" element={<Placements />} />
            <Route path="anti-ragging" element={<AntiRagging />} />
            <Route path="ncc" element={<NCC />} />
            <Route path="vc-vision" element={<VCVision />} />
            <Route path="departments" element={<Departments />} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="admissions" element={<Admissions />} />
            <Route path="societies" element={<Societies />} />
            <Route path="events" element={<Events />} />
            <Route path="notices" element={<Notices />} />
            <Route path="contact" element={<Contact />} />
            <Route path="student-login" element={<StudentLogin />} />
            <Route path="teacher-login" element={<TeacherLogin />} />
            <Route path="admin-login" element={<AdminLogin />} />
            <Route path="teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="student-dashboard" element={<StudentDashboard />} />
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            <Route path="sitemap" element={<SiteMap />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
