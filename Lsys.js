// Define the L-System rules and parameters
const d1 = 94.74; // divergence angle 1
const d2 = 132.63; // divergence angle 2
const a = 18.95; // branching angle
const lr = 1.109; // elongation rate
const vr = 1.732; // width increase rate
let sentence = "!(1)F(200)/(45)A";
let rules = {
  'A': () => `!(1)F(50)[&(${a})F(50)A]/(${d1})[&(${a})F(50)A]/(${d2})[&(${a})F(50)A]`,
  'F': (l) => `F(${l * lr})`,
  '!': (w) => `!(${w * vr})`
};

function generateSystem(iterations) {
  for (let i = 0; i < iterations; i++) {
    let nextSentence = "";
    let regex = /F\(([^)]+)\)|!\(([^)]+)\)|[A-Z\[\]\+\-\/&]/g;
    let match;
    while ((match = regex.exec(sentence)) !== null) {
      if (match[0] === 'A') {
        nextSentence += rules['A']();
      } else if (match[0].startsWith('F(')) {
        let len = parseFloat(match[1]);
        nextSentence += rules['F'](len);
      } else if (match[0].startsWith('!(')) {
        let width = parseFloat(match[1]);
        nextSentence += rules['!'](width);
      } else {
        nextSentence += match[0];
      }
    }
    sentence = nextSentence;
  }
}

function setup() {
    createCanvas(800, 600);
    background(255);
    angleMode(DEGREES);
    generateSystem(4); // Generate the system with a simplified rule set for testing
  }
  
  function turtle() {
    resetMatrix();
    translate(width / 2, height - 50); // Start from near the bottom center of the canvas
    stroke(0, 100, 0);
    strokeWeight(1);
  
    // Simplified drawing logic for debugging
    let len = 100; // Starting length
    for (let i = 0; i < sentence.length; i++) {
      let currentChar = sentence.charAt(i);
  
      if (currentChar === 'F') {
        line(0, 0, 0, -len);
        translate(0, -len);
      } else if (currentChar === '+') {
        rotate(25); // Adjust angle as needed
      } else if (currentChar === '-') {
        rotate(-25); // Adjust angle as needed
      } else if (currentChar === '[') {
        push();
      } else if (currentChar === ']') {
        pop();
      }
      // Add logic for other commands as needed
    }
  }

function draw() {
  // No continuous drawing to keep the sketch static
}
