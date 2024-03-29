let golShader;

let prevFrame;

function preload() {
  golShader = loadShader('assets/shaders/gol.vert', 'assets/shaders/gol.frag');
}

function setup() {
  let golcnv =createCanvas(windowWidth, windowHeight, WEBGL);
  golcnv.parent('myContainer');

  pixelDensity(1);
  noSmooth();
  
  prevFrame = createGraphics(width, height);
  prevFrame.pixelDensity(1);
  prevFrame.noSmooth();
  
  background(0);
  stroke(255);
  shader(golShader);
  golShader.setUniform("normalRes", [1.0/width, 1.0/height]);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  if(mouseIsPressed) {
    line(
      pmouseX-width/2,
      pmouseY-height/2,
      mouseX-width/2,
      mouseY-height/2
    );
  }  
  
  // Copy the rendered image into our prevFrame image
  prevFrame.image(get(), 0, 0);  
  // Set the image of the previous frame into our shader
  golShader.setUniform('tex', prevFrame);
  
  // Give the shader a surface to draw on
  rect(-width/2,-height/2,width,height);
}