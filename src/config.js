export const lawnStoryConfig = {
  mode: 'prototype', // Change to "sequence" when production frames are available.
  sectionHeightVh: 600,
  smoothing: 0.115,
  maxPixelRatio: 2,
  desktop: {
    frameCount: 180,
    framePath: (index) => `/lawn-sequence/frame-${String(index + 1).padStart(4, '0')}.webp`,
    poster: '/assets/lawn-poster.png',
  },
  mobile: {
    frameCount: 90,
    framePath: (index) => `/lawn-sequence-mobile/frame-${String(index + 1).padStart(4, '0')}.webp`,
    poster: '/assets/lawn-poster.png',
  },
  mower: '/assets/mower-operator-v2.png',
};
