let grid;
let cols, rows;
const cellSize = 10;
const gridWidth = 400;
const gridHeight = 400;

function createGrid(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
  }
  return arr;
}
function setup() {
  createCanvas(gridWidth, gridHeight);
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);
  grid = createGrid(cols, rows);
  // Initialize grid with random water and empty cells
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = random() > 0.5 ? 1 : 0; // 1 for water, 0 for empty
    }
  }
}

function draw() {
    background(220);
  
    // Create a copy of the current grid state
    let newGrid = createGrid(cols, rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        newGrid[i][j] = grid[i][j];
      }
    }
  
    // Apply CA rules for water movement
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows - 1; j++) {
        if (grid[i][j] === 1) {
          // Gravity
          if (grid[i][j + 1] === 0) {
            newGrid[i][j] = 0;
            newGrid[i][j + 1] = 1;
          }
          // Spread
          else if (grid[i][j + 1] === 1) {
            let spread = false;
            if (i > 0 && grid[i - 1][j] === 0) { // spread left
              newGrid[i - 1][j] = 1;
              spread = true;
            }
            if (i < cols - 1 && grid[i + 1][j] === 0) { // spread right
              newGrid[i + 1][j] = 1;
              spread = true;
            }
            if (!spread) { // Stability
              newGrid[i][j] = 1;
            }
          }
        }
      }
    }
  
    // Update grid
    grid = newGrid;
  
    // Display the grid
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (grid[i][j] === 1) {
          fill('blue');
        } else {
          noFill();
        }
        stroke(0);
        rect(i * cellSize, j * cellSize, cellSize, cellSize);
      }
    }
  }
  

