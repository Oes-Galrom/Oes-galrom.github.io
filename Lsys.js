// Define the L-System rules
let axiom = "F";
let sentence = axiom;
let rules = [];
rules[0] = {
  a: "F",
  b: "FF-[-F+F+F]+[+F-F-F]"
};

function generate() {
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  turtle();
}

function turtle() {
  background(255);
  resetMatrix();
  translate(width / 2, height);
  stroke(0, 100, 0);
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    
    if (current == "F") {
      line(0, 0, 0, -100);
      translate(0, -100);
    } else if (current == "+") {
      rotate(PI / 6); // Adjust angle here
    } else if (current == "-") {
      rotate(-PI / 6); // Adjust angle here
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    }
  }
}

function setup() {
  createCanvas(400, 400);
  background(255);
  turtle();
}

function draw() {
  // The draw loop has been left empty on purpose
}

// Click the canvas to generate the next iteration
function mousePressed() {
  generate();
}
