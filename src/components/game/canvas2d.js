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
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear canvas

  // Mark animations for removal
  const toRemove = [];

  animations.forEach((animation, index) => {
    const isActive = animation.update(ctx); // Call the update function
    if (!isActive) {
      toRemove.push(index); // Mark for removal
    }
  });

  // Remove marked animations after loop
  for (let i = toRemove.length - 1; i >= 0; i--) {
    animations.splice(toRemove[i], 1);
  }
  // Continue loop
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
  animations.push(animation);
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

export const cacheShapes = (coordinates, center, scale = 10) => {
  const { cx, cy } = center;
  const shapes = [];
  let path = null;
  coordinates.forEach((p) => {
    const x = p.x * scale + cx;
    const y = p.y * scale + cy;
    if (p.bp) {
      path = new Path2D();
    }

    path[p.c](x, y);
    if (p.fs || p.st) {
      let shape = { path };
      p.fs && (shape.fs = p.fs);

      p.st && (shape.st = p.st);
      p.stw && (shape.stw = p.stw * scale || 1);

      path.closePath();
      shapes.push(shape);
      path = null;
    }
  });
  return shapes;
};

export const drawShape = (ctx, shapes) => {
  for (const shape of shapes) {
    if (shape.fs) {
      ctx.fillStyle = shape.fs;
      ctx.fill(shape.path);
    }
    if (shape.st) {
      ctx.strokeStyle = shape.st;
      ctx.lineWidth = shape.stw;
      ctx.stroke(shape.path);
    }
  }
};
