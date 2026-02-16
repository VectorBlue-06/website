import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className={`theme-icon ${isDark ? 'icon-exit' : 'icon-enter'}`}>
        <Sun size={16} />
      </span>
      <span className={`theme-icon ${isDark ? 'icon-enter' : 'icon-exit'}`}>
        <Moon size={16} />
      </span>
    </button>
  );
}
