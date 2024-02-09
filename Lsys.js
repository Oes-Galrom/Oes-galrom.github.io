let environment;
let agents = [];

function setup() {
  createCanvas(600, 600);
  environment = new Environment(width, height);
  for (let i = 0; i < 100; i++) {
    agents.push(new Agent(random(width), random(height)));
  }
}

function draw() {
  background(220);
  environment.update();
  agents.forEach(agent => {
    agent.senseAndMove(environment);
    agent.display();
  });
  displayEnvironment();
}

class Agent {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.sensorDistance = 10;
    this.sensorAngle = PI / 8;
    this.depositAmount = 1;
    this.moveSpeed = 2;
  }

  senseAndMove(environment) {
    let sensorOffsets = [-this.sensorAngle, 0, this.sensorAngle];
    let maxGradient = -Infinity;
    let chosenDirection = this.vel.copy();

    sensorOffsets.forEach(offset => {
      let direction = this.vel.copy().rotate(offset);
      let samplePos = p5.Vector.add(this.pos, direction.setMag(this.sensorDistance));
      let gradient = environment.getGradientAt(samplePos.x, samplePos.y);

      if (gradient > maxGradient) {
        maxGradient = gradient;
        chosenDirection = direction;
      }
    });

    this.vel = chosenDirection;
    this.pos.add(this.vel.setMag(this.moveSpeed));
    this.deposit(environment);
    this.wrapAround();
  }

  deposit(environment) {
    environment.depositAt(this.pos.x, this.pos.y, this.depositAmount);
  }

  wrapAround() {
    this.pos.x = (this.pos.x + width) % width;
    this.pos.y = (this.pos.y + height) % height;
  }

  display() {
    stroke(0);
    point(this.pos.x, this.pos.y);
  }
}

class Environment {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = Array.from({ length: height }, () => new Array(width).fill(0));
    this.diffusionRate = 0.1;
    this.decayRate = 0.01;
  }

  depositAt(x, y, amount) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.grid[Math.floor(y)][Math.floor(x)] += amount;
    }
  }

  getGradientAt(x, y) {
    return this.grid[Math.floor(y)]?.[Math.floor(x)] || 0;
  }

  function mousePressed() {
    // Check if the mouse position is within the canvas bounds
    if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
      // Deposit a larger amount of chemical at the mouse position
      environment.depositAt(mouseX, mouseY, 50); // Increase the 50 to deposit more "chemical"
    }
  }
  


  update() {
    let newGrid = Array.from({ length: this.height }, () => new Array(this.width).fill(0));

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let sum = 0;
        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            let nx = x + dx, ny = y + dy;
            if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
              sum += this.grid[ny][nx];
              count++;
            }
          }
        }
        let average = sum / count;
        newGrid[y][x] = average - this.decayRate;
      }
    }

    this.grid = newGrid.map(row => row.map(value => max(value, 0))); // Ensure values don't go negative
  }
}

function displayEnvironment() {
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const index = (x + y * width) * 4;
      const value = environment.getGradientAt(x, y);
      pixels[index] = pixels[index + 1] = pixels[index + 2] = 255 - value * 255; // Mapping concentration to grayscale
      pixels[index + 3] = 255; // Fully opaque
    }
  }
  updatePixels();
}
