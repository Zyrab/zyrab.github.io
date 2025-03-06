export const initCanvas2D = (canvasID, parent) => {
  const canvas = document.createElement("canvas");
  canvas.id = canvasID;
  parent.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  return { canvas, ctx };
};

export const resizeCanvas2D = (canvas) => {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = 700 * dpr;
  canvas.height = 900 * dpr;
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
