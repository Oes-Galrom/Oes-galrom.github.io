let grid;
let gridWidth, gridHeight;

const dampingFactor = 0.99;
const rippleThreshold = 0.01;

function setup() {
    gridWidth = windowWidth;
    gridHeight = windowHeight;
    let canvas = createCanvas(gridWidth, gridHeight);
    canvas.parent('canvas-container');
    grid = createGrid(gridWidth, gridHeight);
    background(90, 90, 90); // Initial background
}

function windowResized() {
    gridWidth = windowWidth;
    gridHeight = windowHeight;
    resizeCanvas(gridWidth, gridHeight);
    grid = createGrid(gridWidth, gridHeight);
}

function createGrid(width, height) {
    let newGrid = new Array(height);
    for (let y = 0; y < height; y++) {
        newGrid[y] = new Array(width).fill(0);
    }
    return newGrid;
}

function updateGrid() {
    let newGrid = createGrid(gridWidth, gridHeight);

    for (let y = 1; y < gridHeight - 1; y++) {
        for (let x = 1; x < gridWidth - 1; x++) {
            let avg = (grid[y - 1][x] + grid[y + 1][x] + grid[y][x - 1] + grid[y][x + 1]) / 4;
            newGrid[y][x] = avg * dampingFactor;
        }
    }

    grid = newGrid.map(row => row.map(value => value > rippleThreshold ? value : 0));
}

function generateDroplet() {
    if (random() < 0.1) { // Adjust probability as needed
        let dropletX = int(random(gridWidth));
        let dropletY = int(random(gridHeight));
        grid[dropletY][dropletX] = 255; // Start with a high value for a visible ripple
    }
}

function renderGrid() {
    loadPixels();
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            let idx = (x + y * width) * 4;
            let value = grid[y][x];
            pixels[idx] = value; // Red channel
            pixels[idx + 1] = value; // Green channel
            pixels[idx + 2] = value; // Blue channel
            pixels[idx + 3] = 255; // Alpha channel
        }
    }
    updatePixels();
}

function draw() {
    updateGrid();
    generateDroplet();
    renderGrid();
}
