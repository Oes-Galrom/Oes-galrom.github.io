let golShader;
let prevFrame;

let cw, ch;

  
function preload() {//load shader assets
  golShader = loadShader('assets/shaders/gol.vert', 'assets/shaders/gol.frag');
}
function setup() {
  const container = document.getElementById('golcnv');
  cw = container.offsetWidth;
  ch = container.offsetHeight;
  console.log(cw);//test cw 

  let cnv = createCanvas(cw, ch, WEBGL);
  cnv.parent('golcnv');//needs to point at the css-grid segment needed
  cnv.style('position', 'absolute')
  cnv.style('inset', 0)
  //cnv.style('z-index', -1)

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
      pmouseX-cw/2,
      pmouseY-ch/2,
      mouseX-cw/2,
      mouseY-ch/2
    );
  }  
  
  prevFrame.image(get(), 0, 0);  
  golShader.setUniform('tex', prevFrame);
  
  rect(-cw / 2, -ch / 2, cw, ch);
}

function windowResized() {
  const container = document.getElementById('golcnv');
  cw = container.offsetWidth; // cw and ch need to be set to the grids parameters.
  ch = container.offsetHeight;
  resizeCanvas(cw, ch);
}


