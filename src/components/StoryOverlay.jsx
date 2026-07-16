import { useEffect, useRef } from 'react';

const chapters = [
  { range: [0, .26], eyebrow: 'Professional Lawn Care', title: 'A Better Cut Starts Here', body: 'Precision equipment, consistent service, and a lawn maintained with care.' },
  { range: [.22, .54], eyebrow: 'Precision', title: 'Clean Lines. Consistent Results.', body: 'Commercial-grade equipment creates an even cut and a professionally maintained appearance.' },
  { range: [.5, .83], eyebrow: 'Dependable Service', title: 'Your Property, Properly Maintained', body: 'Reliable scheduling and careful workmanship keep your lawn looking its best.' },
  { range: [.79, 1], eyebrow: 'Your lawn, elevated', title: 'Ready for a Better-Looking Lawn?', cta: true },
];

const mobileEntryOffsets = [
  { x: -42, y: 18 },
  { x: 44, y: -12 },
  { x: -24, y: -38 },
  { x: 34, y: 28 },
];

export default function StoryOverlay({ stageRef }) {
  const rootRef = useRef(null);
  useEffect(() => {
    const stage = stageRef.current;
    const blocks = [...rootRef.current.querySelectorAll('.chapter')];
    const update = ({ detail: p }) => blocks.forEach((block, index) => {
      const [start, end] = chapters[index].range;
      const feather = Math.min(.035, (end - start) * .22);
      const inOpacity = (p - start) / feather;
      const isFinal = index === chapters.length - 1;
      const outOpacity = isFinal ? 1 : (end - p) / feather;
      const opacity = Math.max(0, Math.min(1, inOpacity, outOpacity));
      const exitOffset = isFinal ? 0 : (1 - Math.min(1, Math.max(0, outOpacity))) * 12;
      const offset = (1 - Math.min(1, Math.max(0, inOpacity))) * 20 - exitOffset;
      const mobile = window.matchMedia('(max-width: 720px)').matches;
      block.style.opacity = opacity;
      if (mobile) {
        const entry = mobileEntryOffsets[index];
        const entering = 1 - Math.min(1, Math.max(0, inOpacity));
        const exiting = isFinal ? 0 : 1 - Math.min(1, Math.max(0, outOpacity));
        const x = entry.x * entering - entry.x * .35 * exiting;
        const y = entry.y * entering - entry.y * .35 * exiting;
        block.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      } else {
        block.style.transform = `translateY(${offset}px)`;
      }
      block.style.filter = `blur(${(1 - opacity) * 5}px)`;
      block.setAttribute('aria-hidden', opacity < .15 ? 'true' : 'false');
    });
    stage?.addEventListener('storyprogress', update);
    return () => stage?.removeEventListener('storyprogress', update);
  }, [stageRef]);
  return (
    <div className="story-overlay" ref={rootRef}>
      {chapters.map((chapter, index) => (
        <div className={`chapter chapter-${index + 1}`} key={chapter.title}>
          <p className="chapter-eyebrow">{chapter.eyebrow}</p>
          <h2>{chapter.title}</h2>
          {chapter.body && <p>{chapter.body}</p>}
          {chapter.cta && <a className="story-button" href="tel:+15408159402" aria-label="Call Terry Enterprises Lawn Care at 540-815-9402">Call Now <span aria-hidden="true">↗</span></a>}
        </div>
      ))}
    </div>
  );
}
