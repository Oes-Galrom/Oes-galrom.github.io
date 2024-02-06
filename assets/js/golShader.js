let golShader;

function preload() {
    golShader = loadShader('gol.vert', 'gol.frag');
  }

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);//include WEBGL
    pixelDensity(1);// 1 pixel
    noSmooth;// no antiliasing
    background(0); //black background
    stroke(255); //white 
    shader(golShader);
    golShader.setUniform("normalRes", [1.0/width, 1.0/height]);//normal res is a vector with size of the pixel normalized between 0 and 1 to calculate neighbords in the shader
}

function draw() {
    if(mouseIsPressed) {
        line(
            pmouseX-width/2,
            pmouseY-height/2,
            mouseX-width/2,
            mouseY-height/2
        )
    }
    golShader.setUniform('tex', get());//pass the state as a texture
    Reflect(-width/2,-height/2,width,height);

}