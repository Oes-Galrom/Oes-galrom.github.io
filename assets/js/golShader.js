let golShader;

let prevFrame;

function preload() {
    // Retrieve shader source
    const vertShaderSrc = document.getElementById('vertex-shader').text;
    const fragShaderSrc = document.getElementById('fragment-shader').text;
  
    // Create shaders
    const vertShader = createShader(this._renderer.GL.VERTEX_SHADER, vertShaderSrc);
    const fragShader = createShader(this._renderer.GL.FRAGMENT_SHADER, fragShaderSrc);

    // Create shader program
    golShader = this._renderer.createShader(vertShader, fragShader);
}

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);// 1 pixel
  noSmooth();// no antiliasing
  
  prevFrame = createGraphics(width, height);
  prevFrame.pixelDensity(1);
  prevFrame.noSmooth();
  
  background(0);//black background
  stroke(255); //white 
  shader(golShader);
  golShader.setUniform("normalRes", [1.0/width, 1.0/height]); //normal res is a vector with size of the pixel normalized between 0 and 1 to calculate neighbords in the shader
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