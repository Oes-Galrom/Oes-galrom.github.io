let grid;
let cols;
let rows;
let resolution = 10; // Size of each cell in the grid

let ant;

function setup() {
  createCanvas(400, 400);
  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols, rows);

  ant = {
    x: floor(cols / 2),
    y: floor(rows / 2),
    dir: 0 // 0: up, 1: right, 2: down, 3: left
  };

  frameRate(10); // Adjust the frame rate as needed
}

function draw() {
  // Draw grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(0);
      } else {
        fill(255);
      }
      stroke(0);
      rect(x, y, resolution, resolution);
    }
  }

  // Update and draw ant
  updateAnt();

  // Draw the ant
  fill(255, 0, 0); // Red color for the ant
  let x = ant.x * resolution;
  let y = ant.y * resolution;
  rect(x, y, resolution, resolution);
}

function updateAnt() {
  let antCol = ant.x;
  let antRow = ant.y;

  if (grid[antCol][antRow] == 0) {
    ant.dir = (ant.dir + 1) % 4; // Turn right
    grid[antCol][antRow] = 1;    // Flip the color
  } else {
    ant.dir = (ant.dir + 3) % 4; // Turn left
    grid[antCol][antRow] = 0;    // Flip the color
  }

  // Move ant forward
  if (ant.dir == 0) {
    ant.y--;
  } else if (ant.dir == 1) {
    ant.x++;
  } else if (ant.dir == 2) {
    ant.y++;
  } else if (ant.dir == 3) {
    ant.x--;
  }

  // Handle ant going off the edges
  ant.x = (ant.x + cols) % cols;
  ant.y = (ant.y + rows) % rows;
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows).fill(0);
  }
  return arr;
}

