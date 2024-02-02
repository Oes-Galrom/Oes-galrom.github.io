// Water Simulation in p5.js

let grid, prevGrid;
const gridWidth = 100;
const gridHeight = 100;
const center = { x: Math.floor(gridWidth / 2), y: Math.floor(gridHeight / 2) };
const dampingFactor = 0.99;

function setup() {
    createCanvas(gridWidth, gridHeight);
    grid = createGrid(gridWidth, gridHeight);
    prevGrid = createGrid(gridWidth, gridHeight);
}

function draw() {
    background(0);
    generateDroplet(center.x, center.y);
    updateGrid();
    renderGrid();
    swapGrids();
}

function createGrid(width, height) {
    let grid = new Array(height);
    for (let y = 0; y < height; y++) {
        grid[y] = new Array(width).fill(0);
    }
    return grid;
}

function updateGrid() {
    for (let y = 1; y < gridHeight - 1; y++) {
        for (let x = 1; x < gridWidth - 1; x++) {
            grid[y][x] = (
                (prevGrid[y - 1][x] + prevGrid[y + 1][x] +
                prevGrid[y][x - 1] + prevGrid[y][x + 1]) / 2
            ) - grid[y][x];
            grid[y][x] *= dampingFactor;
        }
    }
}

function generateDroplet(x, y) {
    if (frameCount % 60 === 0) { // Generate a droplet every second
        grid[y][x] = 500;
    }
}

function renderGrid() {
    loadPixels();
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            let colorValue = 255 - Math.abs(grid[y][x]);
            set(x, y, color(colorValue));
        }
    }
    updatePixels();
}

function swapGrids() {
    let temp = grid;
    grid = prevGrid;
    prevGrid = temp;
}

