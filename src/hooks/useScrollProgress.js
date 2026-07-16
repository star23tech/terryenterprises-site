import { useEffect, useRef } from 'react';

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function useScrollProgress(sectionRef, stageRef, { smoothing, reducedMotion }) {
  const targetRef = useRef(reducedMotion ? 1 : 0);
  const progressRef = useRef(reducedMotion ? 1 : 0);
  const activeRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage || reducedMotion) return;
    let raf = 0;

    const measure = () => {
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      targetRef.current = clamp(-rect.top / distance);
    };
    const render = () => {
      const current = progressRef.current;
      const next = current + (targetRef.current - current) * smoothing;
      progressRef.current = Math.abs(next - targetRef.current) < 0.0001 ? targetRef.current : next;
      stage.style.setProperty('--story-progress', progressRef.current.toFixed(4));
      stage.dispatchEvent(new CustomEvent('storyprogress', { detail: progressRef.current }));
      raf = requestAnimationFrame(render);
    };
    const visibility = new IntersectionObserver(([entry]) => {
      activeRef.current = entry.isIntersecting;
      if (entry.isIntersecting) measure();
    }, { rootMargin: '100% 0px' });
    visibility.observe(section);
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    measure();
    raf = requestAnimationFrame(render);
    return () => {
      visibility.disconnect();
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
      cancelAnimationFrame(raf);
    };
  }, [sectionRef, stageRef, smoothing, reducedMotion]);

  return { progressRef, activeRef };
}
