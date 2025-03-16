export const initWebGL = (canvasId, parent) => {
  const canvas = document.createElement("canvas");
  canvas.id = canvasId;
  parent.appendChild(canvas);
  const gl = canvas.getContext("webgl");

  if (!gl) throw new Error("WebGL not supported");

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
  const buffer = gl.createBuffer();
  return { canvas, gl, buffer };
};

export const resizeCanvas = (canvas, gl) => {
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
  gl.viewport(0, 0, canvas.width, canvas.height);
};

const createShader = (gl, source, type) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(`Shader error (${type}):`, gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

export const createShaderProgram = (gl, vertexSrc, fragmentSrc) => {
  const vertexShader = createShader(gl, vertexSrc, gl.VERTEX_SHADER);
  const fragmentShader = createShader(gl, fragmentSrc, gl.FRAGMENT_SHADER);
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    return null;
  }
  return program;
};
