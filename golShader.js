let golShader;

let prevFrame;

function preload() {
  golShader = loadShader('assets/shaders/gol.vert', 'assets/shaders/gol.frag');
}

function setup() {

  const container = document.getElementById('shaderCanvasContainer');
  const cw = container.offsetWidth;
  const ch = container.offsetHeight;


  shaderCanvas = createCanvas(cw, ch, WEBGL);
  shaderCanvas.parent('shaderCanvasContainer');
  pixelDensity(1);
  noSmooth();
  
  prevFrame = createGraphics(cw, ch, WEBGL);
  prevFrame.pixelDensity(1);
  prevFrame.noSmooth();
  
  background(0);
  noStroke();
  shader(golShader);
 
  golShader.setUniform("normalRes", [1.0/cw, 1.0/ch]);
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
  
  prevFrame.image(get(), 0, 0);  
  golShader.setUniform('tex', prevFrame);
  
  rect(-cw / 2, -ch / 2, cw, ch);
}

function windowResized() {
  // Resize the canvas to fit the container upon window resize
  const container = document.getElementById('shaderCanvasContainer');
  const cw = container.offsetWidth;
  const ch = container.offsetHeight;
  resizeCanvas(cw, ch);
}