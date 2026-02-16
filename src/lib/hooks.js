import { useEffect, useRef, useState } from 'react';

export function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

// Hook to auto-attach reveal animations to all .reveal children
export function useRevealOnScroll() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}

export function useCountUp(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const numEnd = parseInt(end.replace(/[^0-9]/g, ''));
    if (isNaN(numEnd)) {
      setCount(end); // eslint-disable-line react-hooks/set-state-in-effect
      return;
    }

    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * numEnd));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isActive, end, duration]);

  return [count, setIsActive];
}
