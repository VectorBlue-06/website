import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { EffectsProvider } from './context/EffectsContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Departments from './pages/Departments';
import Faculty from './pages/Faculty';
import Admissions from './pages/Admissions';
import Notices from './pages/Notices';
import Contact from './pages/Contact';
import Events from './pages/Events';
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
      <EffectsProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="departments" element={<Departments />} />
              <Route path="faculty" element={<Faculty />} />
              <Route path="admissions" element={<Admissions />} />
              <Route path="notices" element={<Notices />} />
              <Route path="contact" element={<Contact />} />
              <Route path="events" element={<Events />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </EffectsProvider>
    </ThemeProvider>
  );
}

export default App;
