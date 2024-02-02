function setup() {
    createCanvas(800, 400); // Adjusted for multiple frames
    cols = width / resolution / 2; // Adjust grid size for multiple frames
    rows = height / resolution;
    frameRate(10); // Adjust the frame rate as needed
  }
  
  function draw() {
    noLoop(); // Stop the draw loop
  
    let framesToShow = [10000, 20000, 30000]; // Example frame numbers
    framesToShow.forEach((frameNumber, index) => {
      let gridState = calculateFrameState(frameNumber);
      drawFrame(gridState, index);
    });
  }
  
  function calculateFrameState(frameNumber) {
    let localGrid = make2DArray(cols, rows);
    let localAnt = {
      x: floor(cols / 2),
      y: floor(rows / 2),
      dir: 0
    };
  
    for (let i = 0; i < frameNumber; i++) {
      updateAnt(localGrid, localAnt);
    }
  
    return localGrid;
  }
  
  function drawFrame(grid, frameIndex) {
    let xOffset = frameIndex * cols * resolution;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution + xOffset;
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
  }
  
  function updateAnt(grid, ant) {
    let antCol = ant.x;
    let antRow = ant.y;
  
    if (grid[antCol][antRow] == 0) {
      ant.dir = (ant.dir + 1) % 4;
      grid[antCol][antRow] = 1;
    } else {
      ant.dir = (ant.dir + 3) % 4;
      grid[antCol][antRow] = 0;
    }
  
    if (ant.dir == 0) {
      ant.y--;
    } else if (ant.dir == 1) {
      ant.x++;
    } else if (ant.dir == 2) {
      ant.y++;
    } else if (ant.dir == 3) {
      ant.x--;
    }
  
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
  
