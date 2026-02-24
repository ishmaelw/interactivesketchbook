let steps = 0;
let maxSteps = 8;


let holdTime = 0;
let holdThreshold = 30; 

function setup() {
  createCanvas(600, 200);
}

function draw() {
  background(220);

  let sectionWidth = width / maxSteps;


  noStroke();
  fill("#fff700ff");
  for (let i = 0; i < steps; i++) {
    rect(i * sectionWidth, 0, sectionWidth, height);
  }


  if (mouseIsPressed && steps < maxSteps) {
    holdTime++;


    if (holdTime > holdThreshold) {
      steps++;
      holdTime = 0; 
    }
  } else {
    holdTime = 0; 
  }


  if (steps == maxSteps) {
    textSize(16);
    fill(0);
    text("State: Complete", width - 150, height - 20);
  }
}
