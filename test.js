// Water Simulation in p5.js

let grid;
const gridWidth = 1000;
const gridHeight = 1000;
const center = { x: gridWidth / 2, y: gridHeight / 2 };
const dampingFactor = 0.99;
const rippleThreshold = 0.01;

function setup() {
    createCanvas(gridWidth, gridHeight);
    grid = createGrid(gridWidth, gridHeight);
}

function draw() {
    background(0);
    updateGrid();
    generateDroplet();
    renderGrid();
}

function createGrid(width, height) {
    let grid = new Array(height);
    for (let y = 0; y < height; y++) {
        grid[y] = new Array(width).fill(0);
    }
    return grid;
}

function updateGrid() {
    let newGrid = createGrid(gridWidth, gridHeight);

    for (let y = 1; y < gridHeight - 1; y++) {
        for (let x = 1; x < gridWidth - 1; x++) {
            let avg = (
                grid[y - 1][x] + grid[y + 1][x] +
                grid[y][x - 1] + grid[y][x + 1]
            ) / 4;

            newGrid[y][x] = avg * dampingFactor;
        }
    }

    grid = newGrid.map(row => row.map(value => value > rippleThreshold ? value : 0));
}

function generateDroplet() {
    if (random() < 0.05) {
        let dropletX = int(random(gridWidth));
        let dropletY = int(random(gridHeight));
        grid[dropletY][dropletX] = 255;
    }
}

function renderGrid() {
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            let colorValue = grid[y][x];
            stroke(255 - colorValue);
            point(x, y);
        }
    }
}
