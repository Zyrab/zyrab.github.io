const n = 512;
let w, h, x, y, z;
let starColorRatio,
  starRatio = 256,
  starSpeed = 0.4,
  starSpeedPrev = 0;
const stars = Array.from({ length: n }, () => new Array(5));
const opacity = 0.1;
let cursorX = 0,
  cursorY = 0;
let context, timeout;
let isRunning = !0;
const canvas = document.getElementById("space");
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
    star[0] = Math.random() * w * 2 - x * 2;
    star[1] = Math.random() * h * 2 - y * 2;
    star[2] = Math.round(Math.random() * z);
    star[3] = 0;
    star[4] = 0;
  });
  canvas.width = w;
  canvas.height = h;
  context = canvas.getContext("2d");
  context.fillStyle = "rgb(38,38,38)";
  context.strokeStyle = "rgb(255,255,255)";
};
const animate = () => {
  const mouseX = cursorX - x;
  const mouseY = cursorY - y;
  context.fillRect(0, 0, w, h);
  stars.forEach((star) => {
    const [prevX, prevY] = [star[3], star[4]];
    star[0] += mouseX >> 4;
    star[1] += mouseY >> 4;
    star[2] -= starSpeed;
    let test = !0;
    if (star[0] > x * 2) {
      star[0] -= w * 2;
      test = !1;
    }
    if (star[0] < -x * 2) {
      star[0] += w * 2;
      test = !1;
    }
    if (star[1] > y * 2) {
      star[1] -= h * 2;
      test = !1;
    }
    if (star[1] < -y * 2) {
      star[1] += h * 2;
      test = !1;
    }
    if (star[2] > z) {
      star[2] -= z;
      test = !1;
    }
    if (star[2] < 0) {
      star[2] += z;
      test = !1;
    }
    star[3] = x + (star[0] / star[2]) * starRatio;
    star[4] = y + (star[1] / star[2]) * starRatio;
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
const handleKeyPress = (evt) => {
  const key = evt.keyCode;
  switch (key) {
    case 80:
    case 112:
      isRunning = !isRunning;
      if (isRunning) animate();
      break;
    case 32:
      starSpeedPrev = starSpeed !== 0 ? starSpeed : starSpeedPrev;
      starSpeed = starSpeed !== 0 ? 0 : starSpeedPrev;
      break;
    case 13:
      context.fillStyle = `rgba(38,38,38,${opacity})`;
      break;
  }
};
document.addEventListener("keypress", handleKeyPress);
window.addEventListener("resize", init);
window.addEventListener("orientationchange", init);
init();
animate();
