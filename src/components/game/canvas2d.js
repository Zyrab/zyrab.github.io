export const initCanvas2D = () => {
  const canvas = document.getElementById("canvas2D");
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
let lastTime = 0;
const TARGET_FPS = 60;
const FRAME_TIME = 1000 / TARGET_FPS; // 16.67ms per frame at 60 FPS

const animate = (ctx, timestamp) => {
  if (animations.length === 0) {
    animationFrame = null;
    return;
  }
  if (lastTime === 0) lastTime = timestamp; // Initialize properly
  let deltaTime = (timestamp - lastTime) / FRAME_TIME;
  lastTime = timestamp;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const toRemove = [];

  animations.forEach((animation, index) => {
    const isActive = animation.update(ctx, deltaTime);
    if (!isActive) {
      toRemove.push(index);
    }
  });
  for (let i = toRemove.length - 1; i >= 0; i--) {
    animations.splice(toRemove[i], 1);
  }
  animationFrame = requestAnimationFrame(animate.bind(null, ctx));
};

// Function to start the loop (if not running)
export const startAnimationLoop = (ctx) => {
  if (!animationFrame) {
    animationFrame = requestAnimationFrame(animate.bind(null, ctx));
  }
};
export const clearAnimations = () => (animations.length = 0);
export const stopAnimationLoop = () => {
  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame); // Stop the loop
    animationFrame = null;
    lastTime = 0;
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
