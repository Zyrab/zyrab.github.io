export const createLightSpeedAnimation = (parentElement) => {
  const n = 512; // Number of stars
  let w, h, x, y, z; // Viewport dimensions and center
  let starColorRatio,
    starRatio = 256,
    starSpeed = 4,
    starSpeedPrev = 0;
  const stars = Array.from({ length: n }, () => new Array(5));
  const opacity = 0.1;
  let cursorX = 0,
    cursorY = 0;
  let context, timeout;
  let isRunning = true;

  // Create canvas element
  const canvas = document.createElement("canvas");
  canvas.id = "space";
  parentElement.appendChild(canvas);

  const init = () => {
    w = document.documentElement.clientWidth;
    h = document.documentElement.clientHeight;
    x = Math.round(w / 2);
    y = Math.round(h / 2);
    z = (w + h) / 2;
    starColorRatio = 1 / z;
    cursorX = x;
    cursorY = y;

    stars.forEach((star) => {
      star[0] = Math.random() * w * 2 - x * 2; // X
      star[1] = Math.random() * h * 2 - y * 2; // Y
      star[2] = Math.round(Math.random() * z); // Z
      star[3] = 0; // Calculated X
      star[4] = 0; // Calculated Y
    });
    canvas.width = w;
    canvas.height = h;
    context = canvas.getContext("2d");
    context.fillStyle = "rgb(38,38,38)";
    context.strokeStyle = "rgb(255,255,255)";

    // Initialize star positions
  };

  // Animation loop
  const animate = () => {
    const mouseX = cursorX - x;
    const mouseY = cursorY - y;
    context.fillRect(0, 0, w, h);

    stars.forEach((star) => {
      const [prevX, prevY] = [star[3], star[4]];

      // Update star position
      star[0] += mouseX >> 4;
      star[1] += mouseY >> 4;
      star[2] -= starSpeed;

      let test = true;
      // Boundary checks
      if (star[0] > x * 2) {
        star[0] -= w * 2;
        test = false;
      }
      if (star[0] < -x * 2) {
        star[0] += w * 2;
        test = false;
      }
      if (star[1] > y * 2) {
        star[1] -= h * 2;
        test = false;
      }
      if (star[1] < -y * 2) {
        star[1] += h * 2;
        test = false;
      }
      if (star[2] > z) {
        star[2] -= z;
        test = false;
      }
      if (star[2] < 0) {
        star[2] += z;
        test = false;
      }

      // Calculate screen position
      star[3] = x + (star[0] / star[2]) * starRatio;
      star[4] = y + (star[1] / star[2]) * starRatio;

      // Draw star
      if (prevX > 0 && prevX < w && prevY > 0 && prevY < h && test) {
        context.lineWidth = (1 - starColorRatio * star[2]) * 2;
        context.beginPath();
        context.moveTo(prevX, prevY);
        context.lineTo(star[3], star[4]);
        context.stroke();
        context.closePath();
      }
    });

    if (isRunning) {
      timeout = requestAnimationFrame(animate);
    }
  };

  // Event handlers
  const handleMouseMove = (evt) => {
    cursorX = evt.pageX;
    cursorY = evt.pageY;
  };

  const handleKeyPress = (evt) => {
    const key = evt.keyCode;
    switch (key) {
      case 80: // P key
      case 112: // p key
        isRunning = !isRunning;
        if (isRunning) animate();
        break;
      case 32: // Space key
        starSpeedPrev = starSpeed !== 0 ? starSpeed : starSpeedPrev;
        starSpeed = starSpeed !== 0 ? 0 : starSpeedPrev;
        break;
      case 13: // Enter key
        context.fillStyle = `rgba(38,38,38,${opacity})`;
        break;
    }
  };

  const handleMouseDown = () => {
    // context.fillStyle = `rgba(0,0,0,${opacity})`;
  };
  const handleKeyUp = () => {
    context.fillStyle = "rgb(38,38,38)";
  };

  const handleMouseWheel = (evt) => {
    const delta = evt.wheelDelta ? evt.wheelDelta / 120 : -evt.detail / 3;
    starSpeed += delta >= 0 ? -0.2 : 0.2;
  };
  // Attach event listeners
  // document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("keypress", handleKeyPress);
  document.addEventListener("keyup", handleKeyUp);
  document.addEventListener("mousewheel", handleMouseWheel, { passive: false });
  window.addEventListener("resize", init);
  window.addEventListener("orientationchange", init);
  document.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("mouseup", handleKeyUp);
  document.addEventListener("touchstart", handleMouseDown);
  document.addEventListener("touchend", handleKeyUp);

  // Start animation
  init();
  animate();

  // Cleanup function (optional)
  return () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("keypress", handleKeyPress);
    document.removeEventListener("keyup", handleKeyUp);
    document.removeEventListener("mousewheel", handleMouseWheel);
    window.removeEventListener("resize", init);
    window.removeEventListener("orientationchange", init);
    cancelAnimationFrame(timeout);
    parentElement.removeChild(canvas);
  };
};
