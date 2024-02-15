let substances = []; // Array to store substances
let agents = []; // Array to store slime mold agents

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  // Initialize some agents
  for (let i = 0; i < 10; i++) {
    agents.push(createAgent(random(width), random(height)));
  }
}

function draw() {
  background(220);
  // Display substances
  for (let substance of substances) {
    fill(0, 255, 0); // Green color for substance
    circle(substance.x, substance.y, 10); // Draw substance as small circles
  }
  // Display and update agents
  for (let agent of agents) {
    fill(255, 0, 0); // Red color for agents
    circle(agent.pos.x, agent.pos.y, 5); // Draw agent
    updateAgent(agent);
  }
}

function mouseClicked() {
  substances.push(createVector(mouseX, mouseY));
}

function createAgent(x, y) {
  return {
    pos: createVector(x, y),
    vel: createVector(random(-1, 1), random(-1, 1)).normalize()
  };
}

function updateAgent(agent) {
  let choices = [];
  let probabilities = [];

  // Sample potential moves
  for (let angle = 0; angle < TWO_PI; angle += PI / 4) {
    let samplePos = p5.Vector.add(agent.pos, p5.Vector.fromAngle(angle).mult(10));
    let concentration = getTracerConcentration(samplePos);
    choices.push(samplePos);
    probabilities.push(concentration);
  }

  // Normalize probabilities
  let sum = probabilities.reduce((a, b) => a + b, 0);
  probabilities = probabilities.map(p => p / sum);

  // Monte Carlo selection for the next move
  let chosenIndex = monteCarlo(probabilities);
  agent.pos = choices[chosenIndex];
}

function getTracerConcentration(position) {
  // Simplified concentration model: sum of inverse distances to substances
  let concentration = 0;
  for (let substance of substances) {
    let distance = p5.Vector.dist(position, createVector(substance.x, substance.y));
    if (distance < 1) distance = 1; // Avoid division by zero
    concentration += 1 / distance;
  }
  return concentration;
}

function monteCarlo(probabilities) {
  let index = 0, r = random(1);
  while (r > 0) {
    r -= probabilities[index];
    index++;
  }
  index--;
  return index;
}
