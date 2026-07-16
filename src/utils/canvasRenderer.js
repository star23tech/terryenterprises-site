export function coverRect(sourceWidth, sourceHeight, targetWidth, targetHeight) {
  const scale = Math.max(targetWidth / sourceWidth, targetHeight / sourceHeight);
  const width = sourceWidth * scale;
  const height = sourceHeight * scale;
  return { x: (targetWidth - width) / 2, y: (targetHeight - height) / 2, width, height, scale };
}

export function drawCover(ctx, image, width, height) {
  const rect = coverRect(image.naturalWidth, image.naturalHeight, width, height);
  ctx.drawImage(image, rect.x, rect.y, rect.width, rect.height);
  return rect;
}

function drawCoverPanned(ctx, image, width, height, focusX) {
  const rect = coverRect(image.naturalWidth, image.naturalHeight, width, height);
  const overflowX = Math.max(0, rect.width - width);
  const x = -overflowX * Math.min(.72, Math.max(.28, focusX));
  ctx.drawImage(image, x, rect.y, rect.width, rect.height);
  return { ...rect, x };
}

function pointOnCurve(t, width, height) {
  const p0 = { x: .13 * width, y: .82 * height };
  const p1 = { x: .35 * width, y: .65 * height };
  const p2 = { x: .43 * width, y: .48 * height };
  const p3 = { x: .67 * width, y: .43 * height };
  const u = 1 - t;
  return {
    x: u ** 3 * p0.x + 3 * u ** 2 * t * p1.x + 3 * u * t ** 2 * p2.x + t ** 3 * p3.x,
    y: u ** 3 * p0.y + 3 * u ** 2 * t * p1.y + 3 * u * t ** 2 * p2.y + t ** 3 * p3.y,
  };
}

function traceCurve(ctx, progress, width, height) {
  ctx.beginPath();
  const first = pointOnCurve(0, width, height);
  ctx.moveTo(first.x, first.y);
  const steps = Math.max(2, Math.ceil(progress * 80));
  for (let i = 1; i <= steps; i += 1) {
    const point = pointOnCurve((i / steps) * progress, width, height);
    ctx.lineTo(point.x, point.y);
  }
}

function mobilePoint(t, width, height) {
  const eased = 1 - (1 - t) ** 3;
  return {
    x: width * (.43 + eased * .09),
    y: height * (.76 - eased * .06),
  };
}

function traceMobileCurve(ctx, progress, width, height) {
  ctx.beginPath();
  const first = mobilePoint(0, width, height);
  ctx.moveTo(first.x, first.y);
  const steps = Math.max(2, Math.ceil(progress * 40));
  for (let i = 1; i <= steps; i += 1) {
    const point = mobilePoint((i / steps) * progress, width, height);
    ctx.lineTo(point.x, point.y);
  }
}

export function drawPrototype(ctx, assets, progress, width, height) {
  ctx.clearRect(0, 0, width, height);
  const mobile = height / width > 1.25;

  // Hold the mower once the final chapter arrives. The remaining scroll
  // distance lets the closing message stay visible before the stage unpins.
  const mowerProgress = Math.min(progress, .82);
  const mobileProgress = mowerProgress / .82;

  if (mobile) {
    // The portrait composition creates motion primarily by panning through the
    // wide lawn image while the mower remains large and nearly stationary.
    drawCoverPanned(ctx, assets.poster, width, height, .38 + mobileProgress * .20);
  } else {
    drawCover(ctx, assets.poster, width, height);
  }

  // A single restrained cut swath follows the mower, without stripe accents.
  ctx.save();
  if (mobile) traceMobileCurve(ctx, mobileProgress, width, height);
  else traceCurve(ctx, mowerProgress, width, height);
  ctx.lineCap = 'butt';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = 'rgba(110, 150, 63, .28)';
  ctx.lineWidth = mobile ? width * .25 : Math.max(70, width * .105);
  ctx.stroke();
  ctx.restore();

  const p = mobile
    ? mobilePoint(mobileProgress, width, height)
    : pointOnCurve(mowerProgress, width, height);
  const next = mobile
    ? mobilePoint(Math.min(1, mobileProgress + .01), width, height)
    : pointOnCurve(Math.min(1, mowerProgress + .01), width, height);
  const previous = mobile
    ? mobilePoint(Math.max(0, mobileProgress - .01), width, height)
    : null;
  // At the mobile endpoint, use the trailing tangent instead of two identical
  // end points. This prevents the mower rotation from snapping during its hold.
  const directionX = mobile && mobileProgress >= .99 ? p.x - previous.x : next.x - p.x;
  const directionY = mobile && mobileProgress >= .99 ? p.y - previous.y : next.y - p.y;
  const angle = Math.atan2(directionY, directionX) + .03;
  const scale = (width / 1680) * (1.04 - mowerProgress * .28);
  const mowerW = mobile ? width * .95 : Math.min(width * .29, 460 * scale) * 1.25;
  const mowerH = mowerW * (assets.mower.naturalHeight / assets.mower.naturalWidth);
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(mobile ? angle * .08 : angle * .18);
  const shadowScale = mobile ? width / 700 : scale;
  ctx.filter = `drop-shadow(0 ${16 * shadowScale}px ${15 * shadowScale}px rgba(0,0,0,.42))`;
  ctx.drawImage(assets.mower, -mowerW * .5, -mowerH * .66, mowerW, mowerH);
  ctx.restore();

  const shade = ctx.createLinearGradient(0, 0, width, 0);
  shade.addColorStop(0, 'rgba(4,12,6,.62)');
  shade.addColorStop(.38, 'rgba(4,12,6,.13)');
  shade.addColorStop(1, 'rgba(4,12,6,.06)');
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, width, height);
}
