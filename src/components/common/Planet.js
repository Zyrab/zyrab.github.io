// Get the WebGL context
const canvas = document.getElementById("webglCanvas");
const gl = canvas.getContext("webgl");

// Resize canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

// Basic vertex shader (positions vertices in 3D)
const vertexShaderSource = `
    attribute vec3 position;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

// Basic fragment shader (sets color)
const fragmentShaderSource = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(0.8, 0.8, 1.0, 1.0); // Light blue spaceship
    }
`;

// Compile shaders
function compileShader(gl, source, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader error: ", gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}

// Create shader program
const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
const fragmentShader = compileShader(
  gl,
  fragmentShaderSource,
  gl.FRAGMENT_SHADER
);
const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// Define a simple spaceship (Replace this with a model loader)
const spaceshipVertices = new Float32Array([
  0.0,
  0.5,
  0.0, // Top
  -0.5,
  -0.5,
  0.5, // Bottom left
  0.5,
  -0.5,
  0.5, // Bottom right

  0.0,
  0.5,
  0.0, // Top
  0.5,
  -0.5,
  0.5, // Bottom right
  0.5,
  -0.5,
  -0.5, // Back right

  0.0,
  0.5,
  0.0, // Top
  0.5,
  -0.5,
  -0.5, // Back right
  -0.5,
  -0.5,
  -0.5, // Back left

  0.0,
  0.5,
  0.0, // Top
  -0.5,
  -0.5,
  -0.5, // Back left
  -0.5,
  -0.5,
  0.5, // Bottom left
]);

// Create WebGL buffer
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, spaceshipVertices, gl.STATIC_DRAW);

// Link shader attributes
const positionAttrib = gl.getAttribLocation(shaderProgram, "position");
gl.enableVertexAttribArray(positionAttrib);
gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 0, 0);

// Set up matrices
const modelViewMatrix = new Float32Array([
  1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -2, 0, 0, 0, 1,
]);

const projectionMatrix = new Float32Array([
  1.5, 0, 0, 0, 0, 1.5, 0, 0, 0, 0, -1.01, -1, 0, 0, -0.02, 0,
]);

// Send matrices to the shader
const modelViewMatrixLoc = gl.getUniformLocation(
  shaderProgram,
  "modelViewMatrix"
);
const projectionMatrixLoc = gl.getUniformLocation(
  shaderProgram,
  "projectionMatrix"
);
gl.uniformMatrix4fv(modelViewMatrixLoc, false, modelViewMatrix);
gl.uniformMatrix4fv(projectionMatrixLoc, false, projectionMatrix);

// Render loop
function drawScene() {
  gl.clearColor(0, 0, 0, 1); // Black background
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, spaceshipVertices.length / 3);
  requestAnimationFrame(drawScene);
}
drawScene();
