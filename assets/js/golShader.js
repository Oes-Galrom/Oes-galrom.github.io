let golShader;

let prevFrame;

function preload() {
  golShader = loadShader('assets/shaders/gol.vert', 'assets/shaders/gol.frag');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  noSmooth();
  
  prevFrame = createGraphics(width, height, WEBGL);
  prevFrame.pixelDensity(1);
  prevFrame.noSmooth();
  
  background(0);
  stroke(255);
  shader(golShader);
  golShader.setUniform("normalRes", [1.0/width, 1.0/height]);
}

function draw() {
    if (mouseIsPressed) {
      prevFrame.stroke(255);
      prevFrame.line(
        pmouseX - width / 2,
        pmouseY - height / 2,
        mouseX - width / 2,
        mouseY - height / 2
      );
    }
  
    prevFrame.shader(golShader);
    golShader.setUniform('tex', prevFrame);
    prevFrame.rect(-width / 2, -height / 2, width, height);
    image(prevFrame, -width / 2, -height / 2, width, height);
  
    // Adjusted copy method
    prevFrame.copy(drawingContext, 0, 0, width, height, 0, 0, width, height);
  }