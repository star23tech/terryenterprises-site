const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const lawnStoryConfig = {
  mode: 'prototype', // Change to "sequence" when production frames are available.
  sectionHeightVh: 600,
  smoothing: 0.115,
  maxPixelRatio: 2,
  desktop: {
    frameCount: 180,
    framePath: (index) => assetUrl(`lawn-sequence/frame-${String(index + 1).padStart(4, '0')}.webp`),
    poster: assetUrl('assets/lawn-poster.png'),
  },
  mobile: {
    frameCount: 90,
    framePath: (index) => assetUrl(`lawn-sequence-mobile/frame-${String(index + 1).padStart(4, '0')}.webp`),
    poster: assetUrl('assets/lawn-poster.png'),
  },
};
