import { createContext, useContext, useState, useEffect } from 'react';

const EffectsContext = createContext();

export function EffectsProvider({ children }) {
  const [effectsEnabled, setEffectsEnabled] = useState(() => {
    const saved = localStorage.getItem('soet-effects');
    if (saved !== null) return saved === 'true';
    // Disable by default on reduced-motion preference
    return !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-effects', effectsEnabled ? 'on' : 'off');
    localStorage.setItem('soet-effects', String(effectsEnabled));
  }, [effectsEnabled]);

  const toggleEffects = () => setEffectsEnabled((prev) => !prev);

  return (
    <EffectsContext.Provider value={{ effectsEnabled, toggleEffects }}>
      {children}
    </EffectsContext.Provider>
  );
}

export const useEffects = () => useContext(EffectsContext); // eslint-disable-line react-refresh/only-export-components
