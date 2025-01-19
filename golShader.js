let golShader;
let prevFrame;

function preload() {
  golShader = loadShader('assets/shaders/gol.vert', 'assets/shaders/gol.frag');
}

function setup() {
  // create the canvas so it fits the container
  const canvasParent = document.getElementById('canvas-container');
  let c = createCanvas(windowWidth, windowHeight, WEBGL);
  c.parent(canvasParent);

  pixelDensity(1);
  noSmooth();

  prevFrame = createGraphics(width, height);
  prevFrame.pixelDensity(1);
  prevFrame.noSmooth();

  shader(golShader);
  golShader.setUniform("normalRes", [1.0/width, 1.0/height]);
  background(0);
  stroke(255);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  prevFrame.resizeCanvas(width, height);
  golShader.setUniform("normalRes", [1.0/width, 1.0/height]);
}

function draw() {
  if (mouseIsPressed) {
    line(
      pmouseX - width / 2,
      pmouseY - height / 2,
      mouseX - width / 2,
      mouseY - height / 2
    );
  }

  prevFrame.image(get(), 0, 0);
  golShader.setUniform('tex', prevFrame);
  rect(-width/2, -height/2, width, height);
}
