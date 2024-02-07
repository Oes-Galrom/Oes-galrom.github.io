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

function turtle() {
    resetMatrix();
    // Translate to the middle of the screen horizontally and to the bottom of the screen vertically
    translate(width / 2, height);
    
    stroke(0, 100, 0); // Set the drawing color for the tree
    let stack = [];
    let regex = /F\(([^)]+)\)|!\(([^)]+)\)|\+|\-|\/\(([^)]+)\)|&\(([^)]+)\)|\[|\]/g;
    let match;
    while ((match = regex.exec(sentence)) !== null) {
      if (match[0].startsWith('F(')) {
        let len = parseFloat(match[1]);
        line(0, 0, 0, -len); // Draw a line upwards
        translate(0, -len); // Move the drawing position upwards
      } else if (match[0].startsWith('!(')) {
        let width = parseFloat(match[1]);
        strokeWeight(width); // Set the line width
      } else if (match[0] === '+') {
        rotate(radians(d1)); // Rotate right by d1 degrees
      } else if (match[0] === '-') {
        rotate(radians(-d1)); // Rotate left by d1 degrees
      } else if (match[0].startsWith('/(')) {
        rotate(radians(parseFloat(match[1]))); // Roll the drawing angle
      } else if (match[0].startsWith('&(')) {
        rotate(radians(parseFloat(match[1]))); // Pitch the drawing angle
      } else if (match[0] === '[') {
        push(); // Save the current drawing state
      } else if (match[0] === ']') {
        pop(); // Restore the previous drawing state
      }
    }
  }

function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
  generateSystem(4); // Adjust the number of iterations
  turtle();
}

function draw() {
  // No continuous drawing to keep the sketch static
}
