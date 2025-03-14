export const initCanvas2D = (canvasID, parent) => {
  const canvas = document.createElement("canvas");
  canvas.id = canvasID;
  parent.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  return { canvas, ctx };
};

export const resizeCanvas2D = (canvas) => {
  const dpr = window.devicePixelRatio || 1;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Define base aspect ratio (700x900 as reference)
  const baseWidth = 700;
  const baseHeight = 900;
  const aspectRatio = baseWidth / baseHeight;

  let newWidth, newHeight;

  // Adjust based on screen size
  if (screenWidth / screenHeight > aspectRatio) {
    // Wide screens (keep height fixed)
    newHeight = screenHeight;
    newWidth = newHeight * aspectRatio;
  } else {
    // Tall screens (keep width fixed)
    newWidth = screenWidth;
    newHeight = newWidth / aspectRatio;
  }

  // Apply new size with device pixel ratio for sharp rendering
  canvas.width = newWidth * dpr;
  canvas.height = newHeight * dpr;
  canvas.style.width = `${newWidth}px`;
  canvas.style.height = `${newHeight}px`;

  // Return scaling factor for resizing game objects
  return newWidth / baseWidth;
};

const animations = [];
let animationFrame = null;
const animate = (ctx) => {
  if (animations.length === 0) {
    animationFrame = null;
    return;
  }
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const toRemove = [];

  animations.forEach((animation, index) => {
    const isActive = animation.update(ctx);
    if (!isActive) {
      toRemove.push(index);
    }
  });
  for (let i = toRemove.length - 1; i >= 0; i--) {
    animations.splice(toRemove[i], 1);
  }
  animationFrame = requestAnimationFrame(() => animate(ctx));
};

// Function to start the loop (if not running)
export const startAnimationLoop = (ctx) => {
  if (!animationFrame) {
    animationFrame = requestAnimationFrame(() => animate(ctx));
  }
};
export const clearAnimations = () => (animations.length = 0);
export const stopAnimationLoop = () => {
  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame); // Stop the loop
    animationFrame = null;
  }
};
export const addAnimation = (animation, ctx) => {
  if (!animation.zIndex) {
    animations.push(animation);
  } else if (animation.zIndex < 0) {
    animations.unshift(animation);
  } else {
    animations.splice(animation.zIndex, 0, animation);
  }
  startAnimationLoop(ctx);
};

export const normalizeSpeed = (speed, startX, startY, endX, endY) => {
  const dx = endX - startX;
  const dy = endY - startY;

  const magnitude = Math.sqrt(dx * dx + dy * dy);
  if (magnitude === 0) {
    return { nx: 0, ny: 0 };
  }
  // Normalize direction and apply a fixed speed
  const nx = (dx / magnitude) * speed;
  const ny = (dy / magnitude) * speed;

  return { nx, ny };
};

export const getCursorPosition = (canvas, event) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
    y: ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
  };
};

export const cacheShapes = (coordinates) => {
  const shapes = [];
  let center = { x: 0, y: 0 };

  coordinates.forEach((p) => {
    let path = null;

    if (p.svg) {
      center.x = p.svg.width;
      center.y = p.svg.height;
      return;
    }

    // Create the shape based on its type (use else-if to prevent overwriting)
    if (p.path) {
      path = new Path2D(p.path);
    } else if (p.circle) {
      let c = p.circle;
      path = new Path2D();
      path.arc(c.cx, c.cy, c.r, 0, 2 * Math.PI);
    } else if (p.ellipse) {
      let e = p.ellipse;
      path = new Path2D();
      path.ellipse(e.cx, e.cy, e.rx, e.ry, 0, 0, 2 * Math.PI);
    } else if (p.rect) {
      let r = p.rect;
      path = new Path2D();
      path.rect(r.x, r.y, r.width, r.height);
    } else if (p.line) {
      let l = p.line;
      path = new Path2D();
      path.moveTo(l.x1, l.y1);
      path.lineTo(l.x2, l.y2);
    } else if (p.polygon) {
      let poly = p.polygon;
      path = new Path2D();
      path.moveTo(poly.points[0].x, poly.points[0].y);
      poly.points.slice(1).forEach((pt) => path.lineTo(pt.x, pt.y));
      path.closePath();
    }

    // Store the shape only if a valid path exists
    if (path) {
      let shape = { path };

      // Assign fill or stroke
      if (typeof p.fill === "string") shape.fs = p.fill;
      if (typeof p.stroke === "string") {
        shape.st = p.stroke;
        if (p.strokeWidth) shape.stw = p.strokeWidth;
      }

      // Handle gradient fills
      if (typeof p.fill === "object") {
        if (p.fill.type === "linear") shape.fsln = p.fill;
        if (p.fill.type === "radial") shape.fsrd = p.fill;
      }

      // Handle gradient strokes
      if (typeof p.stroke === "object") {
        if (p.stroke.type === "linear") shape.stln = p.stroke;
        if (p.stroke.type === "radial") shape.strd = p.stroke;
        if (p.strokeWidth) shape.stw = p.strokeWidth;
      }

      shapes.push(shape);
    }
  });

  return { shapes, center };
};

const applyGradient = (ctx, grad) => {
  if (!grad) return null;

  if (grad.type === "linear") {
    const { x1 = 0, y1 = 0, x2 = 100, y2 = 100, stops } = grad;
    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    stops.forEach((stop) => gradient.addColorStop(stop.off, stop.clr));
    return gradient;
  }

  if (grad.type === "radial") {
    const { cx, cy, r1, r2, stops } = grad;
    const gradient = ctx.createRadialGradient(cx, cy, r1, cx, cy, r2);
    stops.forEach((stop) => gradient.addColorStop(stop.offset, stop.color));
    return gradient;
  }

  return null;
};

export const drawShape = (ctx, object) => {
  const { shapes, center } = object;

  if (center) {
    ctx.save();
    ctx.translate(0 - center.x / 2, 0 - center.y / 2);
  }

  for (const shape of shapes) {
    let fillStyle =
      shape.fs ||
      applyGradient(ctx, shape.fsln) ||
      applyGradient(ctx, shape.fsrd);
    let strokeStyle =
      shape.st ||
      applyGradient(ctx, shape.stln) ||
      applyGradient(ctx, shape.strd);

    if (fillStyle) {
      ctx.fillStyle = fillStyle;
      ctx.fill(shape.path);
    }

    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = shape.stw || 1;
      ctx.stroke(shape.path);
    }
  }

  if (center) ctx.restore();
};
