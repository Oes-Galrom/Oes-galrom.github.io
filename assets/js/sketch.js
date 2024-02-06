let theShader;
let gridSize;
let gridState;
const cellSize = 20;

function preload() {
  theShader = loadShader('shaders/vertex.vert', 'shaders/fragment.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  gridSize = [ceil(windowWidth / cellSize), ceil(windowHeight / cellSize)];
  gridState = new Array(gridSize[0] * gridSize[1]).fill(0);
  frameRate(30);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  gridSize = [ceil(windowWidth / cellSize), ceil(windowHeight / cellSize)];
  gridState = new Array(gridSize[0] * gridSize[1]).fill(0);
}

function draw() {
  if (random() < 0.05) {
    let index = int(random(gridSize[0] * gridSize[1]));
    gridState[index] = 1;
  }

  theShader.setUniform("gridState", gridState);
  theShader.setUniform("resolution", [width, height]);
  theShader.setUniform("gridSize", gridSize);
  theShader.setUniform("time", millis() / 1000.0);

  shader(theShader);
  rect(0, 0, width, height);

  updateGridState();
}

function updateGridState() {
  for (let i = 0; i < gridState.length; i++) {
    if (gridState[i] > 0) {
      gridState[i] += 0.1;
      if (gridState[i] > 5) {
        gridState[i] = 0;
      }
    }
  }
}
