import { useEffect, useRef } from 'react';

export default function ScrollProgress({ stageRef }) {
  const barRef = useRef(null);
  const labelRef = useRef(null);
  useEffect(() => {
    const stage = stageRef.current;
    const update = ({ detail }) => {
      barRef.current.style.transform = `scaleY(${detail})`;
      labelRef.current.textContent = String(Math.min(4, Math.floor(detail * 4) + 1)).padStart(2, '0');
    };
    stage?.addEventListener('storyprogress', update);
    return () => stage?.removeEventListener('storyprogress', update);
  }, [stageRef]);
  return (
    <div className="progress-indicator" aria-hidden="true">
      <span ref={labelRef}>01</span><div><i ref={barRef} /></div><span>04</span>
    </div>
  );
}
