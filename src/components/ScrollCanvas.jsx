import { useCallback, useState } from 'react';
import { useCanvasRenderer } from '../hooks/useCanvasRenderer';

export default function ScrollCanvas(props) {
  const [status, setStatus] = useState({ state: 'loading', progress: 0 });
  const onStatus = useCallback((next) => setStatus((old) => {
    if (next.state === old.state && Math.abs(next.progress - old.progress) < .05) return old;
    return next;
  }), []);
  useCanvasRenderer({ ...props, onStatus });
  return (
    <>
      <canvas ref={props.canvasRef} className="story-canvas" role="img" aria-label="A commercial mower progressing across a landscaped residential lawn, leaving a clean striped cut behind it." />
      <div className={`canvas-loader is-${status.state}`} aria-live="polite">
        <span>{status.state === 'error' ? 'Showing poster fallback' : 'Preparing the lawn'}</span>
        <i style={{ transform: `scaleX(${status.progress})` }} />
      </div>
    </>
  );
}
