import { useEffect, useRef, useState } from 'react';
import { lawnStoryConfig } from '../config';
import { useScrollProgress } from '../hooks/useScrollProgress';
import ScrollCanvas from './ScrollCanvas';
import StoryOverlay from './StoryOverlay';
import ScrollProgress from './ScrollProgress';

export default function LawnScrollStory() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const [nearby, setNearby] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setNearby(true), { rootMargin: '100% 0px' });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  const { progressRef, activeRef } = useScrollProgress(sectionRef, stageRef, {
    smoothing: lawnStoryConfig.smoothing,
    reducedMotion,
  });

  return (
    <section
      ref={sectionRef}
      className={`lawn-story${reducedMotion ? ' reduced-motion' : ''}`}
      style={{ '--story-height': `${lawnStoryConfig.sectionHeightVh}vh` }}
      aria-label="How professional mowing transforms your lawn"
    >
      <div className="story-stage" ref={stageRef}>
        <ScrollCanvas canvasRef={canvasRef} progressRef={progressRef} activeRef={activeRef} config={lawnStoryConfig} enabled={nearby} reducedMotion={reducedMotion} />
        <StoryOverlay stageRef={stageRef} />
        <ScrollProgress stageRef={stageRef} />
        <div className="stage-grain" aria-hidden="true" />
      </div>
      {reducedMotion && (
        <div className="reduced-copy">
          <h2>Precision care, from edge to edge.</h2>
          <p>Commercial-grade equipment, reliable scheduling, and careful workmanship keep your lawn looking its best.</p>
          <a className="story-button" href="tel:+15408159402" aria-label="Call Terry Enterprises Lawn Care at 540-815-9402">Call Now</a>
        </div>
      )}
    </section>
  );
}
