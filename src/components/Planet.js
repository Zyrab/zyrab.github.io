import { com } from "../services/builder.js";

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
  // const ctx = canvas.getContext("2d");

  // const centerX = canvas.width / 2;
  // const centerY = canvas.height / 2;
  // const radius = Math.min(canvas.width, canvas.height) / 2;
  // const numObjects = 45;
  // const maxDistance = canvas.width / 2;
  // // Load images
  // const imagePaths = [
  //   "../assets/logo.png",
  //   "../assets/logo.png",
  //   "../assets/logo.png",
  //   "../assets/logo.png",
  //   "../assets/logo.png",
  // ];
  // const images = imagePaths.map((src) => {
  //   const img = new Image();
  //   img.src = src;
  //   return img;
  // });

  // const objects = Array.from({ length: numObjects }, () => ({
  //   x: Math.random() * (canvas.width + 2 * maxDistance) - maxDistance,
  //   y: Math.random() * canvas.height,
  //   baseSize: Math.random() * 20 + 2,
  //   speed: 0.5,
  //   aspectRatio: Math.random() * 0.5 + 0.75, // Some objects are not perfect squares
  //   rotation: Math.random() * Math.PI * 2, // Random initial rotation
  //   img: images[Math.floor(Math.random() * images.length)], // Random image
  // }));

  // function draw() {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);

  //   // Circular clipping mask
  //   ctx.save();
  //   ctx.beginPath();
  //   ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  //   ctx.closePath();
  //   ctx.clip();

  //   // Background
  //   ctx.fillStyle = "black";
  //   ctx.fillRect(0, 0, canvas.width, canvas.height);

  //   // Draw image
  //   const img = new Image();
  //   img.src = "../assets/logo.png";

  //   ctx.save();
  //   ctx.translate(centerX, centerY);
  //   ctx.drawImage(img, -30, -50, 40 * 2, 60 * 2);

  //   ctx.restore();
  //   requestAnimationFrame(draw);
  // }

  // draw();
  const ctx = canvas.getContext("2d");

  let angle = 0; // Angle for movement
  let orbitRadius = 50; // Orbit radius (distance from center)
  let rectWidth = 20; // Object width
  let rectHeight = 50; // Object height

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;

    // Calculate object position in orbit
    let objectX = centerX + Math.cos(angle) * orbitRadius;
    let objectY = centerY + Math.sin(angle) * orbitRadius;

    // Perspective effect: Simulate Z-depth (closer = bigger, farther = smaller)
    let perspectiveScale = 0.5 + 0.5 * Math.cos(angle); // Range: 0 to 1
    let scaledWidth = rectWidth * perspectiveScale;
    let scaledHeight = rectHeight * perspectiveScale;

    // Angle to face the center
    let facingAngle = Math.atan2(centerY - objectY, centerX - objectX);

    ctx.save();
    ctx.translate(objectX, objectY);
    ctx.rotate(facingAngle); // Rotate to face center

    // Draw the rectangle (always facing center)
    ctx.fillStyle = "blue";
    ctx.fillRect(
      -scaledWidth / 2,
      -scaledHeight / 2,
      scaledWidth,
      scaledHeight
    );

    ctx.restore();

    angle += 0.05; // Adjust speed
    requestAnimationFrame(draw);
  }

  draw();
};
