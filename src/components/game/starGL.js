import { initWebGL, resizeCanvas, createShaderProgram } from "./webGl.js";
export const initstartTreck = (parent) => {
  const animations = [];

  // === Initialize webGl ===
  const { canvas, gl, buffer } = initWebGL("webglCanvas", parent);
  resizeCanvas(canvas, gl);

  // Stars program
  const starProgram = createShaderProgram(gl, starVertex, starFragment);
  const starArray = generateStarData(60, 20, canvas.width, canvas.height);
  starBuffer(gl, starProgram, buffer, starArray);
  const drawStars = starAnimation(gl, starProgram, starArray.length / 8);
  animations.push(drawStars);

  function renderFrame(time) {
    gl.clear(gl.COLOR_BUFFER_BIT); // Clear before drawing each frame
    for (let draw of animations) {
      draw(time);
    }
    requestAnimationFrame(renderFrame);
  }

  renderFrame(0);
};

export const starVertex = `
  attribute vec2 a_position;
  attribute float a_size;
  attribute vec4 a_color;
  attribute float a_glow;

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_speed;

  varying vec4 v_color;
  varying float v_glow;

  void main() {
    float newY = mod(a_position.y + u_speed * u_time * 0.2, u_resolution.y + 50.0);
    vec2 pos = vec2(a_position.x, newY);
    
    vec2 zeroToOne = pos / u_resolution;
    vec2 clipSpace = zeroToOne * 2.0 - 1.0;
    clipSpace.y = -clipSpace.y;
    
    gl_Position = vec4(clipSpace, 0, 1);
    gl_PointSize = a_size * 1.5;
    
    v_color = a_color;
    v_glow = a_glow;
  }
  `;

export const starFragment = `
  precision mediump float;

  varying vec4 v_color;
  varying float v_glow;

  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
    float alpha = smoothstep(0.5 / v_glow, 0.0, dist);
    gl_FragColor = vec4(v_color.rgb, v_color.a * alpha);
  }
  `;

const getRandomStarColor = () => {
  const colors = [
    [1, 1, 1, 0.8], // White
    [1, 1, 1, 0.2], // Blue-white
    [1, 1, 1, 0.7], // Red
    [1, 1, 1, 0.6], // Greenish
    [1, 1, 1, 0.5], // Yellow
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const generateStarData = (
  numClusters,
  maxClusterSize,
  width,
  height
) => {
  let starData = [];
  for (let i = 0; i < numClusters; i++) {
    let centerX = Math.random() * width;
    let centerY = Math.random() * height;
    let maxBoundary = Math.random() * maxClusterSize;
    let starCount = Math.max(10, Math.floor(maxBoundary * 20));

    for (let j = 0; j < starCount; j++) {
      let angle = Math.random() * Math.PI * 2;
      let distance = Math.pow(Math.random(), 1.5) * maxBoundary * 10;
      let x = centerX + Math.cos(angle) * distance;
      let y = centerY + Math.sin(angle) * distance;
      let size = Math.random() * 2.0 + 1.0;
      let color = getRandomStarColor();
      let glow = Math.random() * 2.0 + 1.0;

      starData.push(x, y, size, ...color, glow);
    }
  }
  return new Float32Array(starData);
};

export const starBuffer = (gl, program, starBuffer, starArray) => {
  gl.bindBuffer(gl.ARRAY_BUFFER, starBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, starArray, gl.STATIC_DRAW);

  const stride = 8 * Float32Array.BYTES_PER_ELEMENT;
  const attributes = {
    a_position: { size: 2, offset: 0 },
    a_size: { size: 1, offset: 2 },
    a_color: { size: 4, offset: 3 },
    a_glow: { size: 1, offset: 7 },
  };

  for (let attr in attributes) {
    let location = gl.getAttribLocation(program, attr);
    let { size, offset } = attributes[attr];
    gl.vertexAttribPointer(
      location,
      size,
      gl.FLOAT,
      false,
      stride,
      offset * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(location);
  }
};

export const starAnimation = (gl, program, starCount) => {
  const u_time = gl.getUniformLocation(program, "u_time");
  const u_resolution = gl.getUniformLocation(program, "u_resolution");
  const u_speed = gl.getUniformLocation(program, "u_speed");

  gl.useProgram(program);
  gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height);
  gl.uniform1f(u_speed, 50.0);

  let startTime = performance.now();

  // Return a draw function that the external loop will call
  return function drawStars(time) {
    let elapsedTime = (time - startTime) / 1000;

    gl.useProgram(program);
    gl.uniform1f(u_time, elapsedTime);
    gl.drawArrays(gl.POINTS, 0, starCount);
  };
};
