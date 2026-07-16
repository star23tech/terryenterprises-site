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

function drawShade(ctx, width, height) {
  const shade = ctx.createLinearGradient(0, 0, width, 0);
  shade.addColorStop(0, 'rgba(4,12,6,.62)');
  shade.addColorStop(.38, 'rgba(4,12,6,.13)');
  shade.addColorStop(1, 'rgba(4,12,6,.06)');
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, width, height);
}

export function drawPrototype(ctx, assets, _progress, width, height) {
  ctx.clearRect(0, 0, width, height);
  const mobile = height / width > 1.25;
  if (mobile) drawCoverPanned(ctx, assets.poster, width, height, .46);
  else drawCover(ctx, assets.poster, width, height);
  drawShade(ctx, width, height);
}
