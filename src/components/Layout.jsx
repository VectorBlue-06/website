import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import EffectsToggle from './EffectsToggle';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <EffectsToggle />
    </>
  );
}
