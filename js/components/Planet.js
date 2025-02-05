import { com } from "../builder.js";

export const Planet = () => {
  const planetWrapper = com({
    el: "div",
    atr: [
      { name: "class", value: "planet" },
      { name: "id", value: "planet-wrapper" },
    ],
    style: { width: "400px", height: "400px", position: "relative" },
  });

  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", "planet");
  canvas.width = 400;
  canvas.height = 400;
  planetWrapper.appendChild(canvas);

  requestAnimationFrame(animate); // Ensure animation starts after the canvas exists

  return planetWrapper;
};

const animate = () => {
  const canvas = document.getElementById("planet");
  const ctx = canvas.getContext("2d");

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(canvas.width, canvas.height) / 2;
  const numObjects = 45;
  const maxDistance = canvas.width / 2;
  // Load images
  const imagePaths = [
    "../assets/logo.png",
    "../assets/logo.png",
    "../assets/logo.png",
    "../assets/logo.png",
    "../assets/logo.png",
  ];
  const images = imagePaths.map((src) => {
    const img = new Image();
    img.src = src;
    return img;
  });

  const objects = Array.from({ length: numObjects }, () => ({
    x: Math.random() * (canvas.width + 2 * maxDistance) - maxDistance,
    y: Math.random() * canvas.height,
    baseSize: Math.random() * 20 + 2,
    speed: 0.5,
    aspectRatio: Math.random() * 0.5 + 0.75, // Some objects are not perfect squares
    rotation: Math.random() * Math.PI * 2, // Random initial rotation
    img: images[Math.floor(Math.random() * images.length)], // Random image
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Circular clipping mask
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    objects.forEach((obj) => {
      obj.x -= obj.speed;

      // Vertical drift (moving slightly upwards from center)
      const centerOffset = obj.x - centerX;
      obj.y -= centerOffset * 0.002; // Small vertical movement (negative = up, positive = down)

      // Wrap around when leaving the canvas
      if (obj.x < -maxDistance) {
        obj.x = canvas.width + maxDistance;
      }

      // Calculate size scaling
      const distanceToCenter = Math.abs(obj.x - centerX);
      const scaleFactor = 1 - distanceToCenter / (canvas.width / 2);
      const newSize = obj.baseSize * (0.5 + scaleFactor);
      const newWidth = newSize * obj.aspectRatio;
      const newHeight = newSize;

      // Rotate and draw image
      ctx.save();
      ctx.translate(obj.x + newWidth / 2, obj.y + newHeight / 2);
      ctx.rotate(obj.rotation);
      ctx.drawImage(
        obj.img,
        -newWidth / 2,
        -newHeight / 2,
        newWidth,
        newHeight
      );
      ctx.restore();
    });

    ctx.restore();
    requestAnimationFrame(draw);
  }

  draw();
};
