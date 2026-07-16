import { useEffect, useRef } from 'react';
import { drawCover, drawPrototype } from '../utils/canvasRenderer';

const loadImage = (src) => new Promise((resolve, reject) => {
  const image = new Image();
  image.decoding = 'async';
  image.onload = () => resolve(image);
  image.onerror = reject;
  image.src = src;
});

export function useCanvasRenderer({ canvasRef, progressRef, activeRef, config, enabled, reducedMotion, onStatus }) {
  const framesRef = useRef([]);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let raf = 0;
    let assets;
    const mobile = matchMedia('(max-width: 720px)').matches;
    const source = mobile ? config.mobile : config.desktop;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, config.maxPixelRatio);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    async function preloadSequence() {
      const total = source.frameCount;
      const queue = Array.from({ length: total - 1 }, (_, i) => i + 1);
      let loaded = 1;
      const worker = async () => {
        while (queue.length && !disposed) {
          const index = queue.shift();
          try { framesRef.current[index] = await loadImage(source.framePath(index)); } catch { /* frame gaps use nearest frame */ }
          loaded += 1;
          onStatus?.({ state: 'loading', progress: loaded / total });
        }
      };
      await Promise.all(Array.from({ length: 4 }, worker));
      if (!disposed) onStatus?.({ state: 'ready', progress: 1 });
    }

    Promise.all([loadImage(source.poster), loadImage(config.mower)])
      .then(([poster, mower]) => {
        if (disposed) return;
        assets = { poster, mower };
        if (config.mode === 'sequence' && !reducedMotion) {
          framesRef.current[0] = poster;
          preloadSequence();
        } else onStatus?.({ state: 'ready', progress: 1 });
      })
      .catch(() => onStatus?.({ state: 'error', progress: 0 }));

    const loop = () => {
      if (assets && (activeRef.current || reducedMotion)) {
        const ctx = canvas.getContext('2d', { alpha: false });
        const progress = reducedMotion ? 1 : progressRef.current;
        if (config.mode === 'sequence' && !reducedMotion) {
          const frameIndex = Math.min(source.frameCount - 1, Math.floor(progress * source.frameCount));
          let frame = framesRef.current[frameIndex];
          for (let i = frameIndex; !frame && i >= 0; i -= 1) frame = framesRef.current[i];
          if (frame) drawCover(ctx, frame, canvas.width, canvas.height);
          else drawPrototype(ctx, assets, progress, canvas.width, canvas.height);
        } else drawPrototype(ctx, assets, progress, canvas.width, canvas.height);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(raf);
      framesRef.current = [];
    };
  }, [canvasRef, progressRef, activeRef, config, enabled, reducedMotion, onStatus]);
}
