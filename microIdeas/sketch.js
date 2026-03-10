let stage;
let started = false;

let gridSize;
let selected = [];
let correctCells = [];

let idleTimer = 0;
let idleLimit = 180;
let maxStage = 4;

let errorState = false;
let errorTimer = 0;
let errorDuration = 120;

let img;
let pixelSize = 10;

function setup() {
  createCanvas(500, 500);
  textAlign(CENTER, CENTER);

  stage = floor(random(0, 3)); 
}

function draw() {
  background(20);

  if (!started) {
    fill(255);
    textSize(24);
    text("Click to Begin Verification", width/2, height/2);
    return;
  }

  if (errorState) {
    fill(255,80,80);
    textSize(28);
    text("Verification Failed", width/2, height/2);

    errorTimer++;

    if (errorTimer > errorDuration) {
      errorState = false;
      errorTimer = 0;
      initializeGrid();
    }

    return;
  }

  if (stage === 0) {
    fill(255);
    textSize(28);
    text("Access Granted", width/2, height/2);
    return;
  }


  if (movedRecently()) {
    idleTimer = 0;
  } else {
    idleTimer++;
  }

  if (idleTimer > idleLimit) {
    stage = min(stage + 1, maxStage);
    initializeGrid();
    idleTimer = 0;
  }

  image(img,0,0);

  fill(255);
  textSize(18);
  text("Select all squares containing the object", width/2,40);

  drawGrid();
}

function movedRecently() {
  return movedX !== 0 || movedY !== 0;
}

function initializeGrid() {

  if (stage === 1) gridSize = 3;
  else if (stage === 2) gridSize = 4;
  else if (stage === 3) gridSize = 6;
  else gridSize = 8;

  selected = [];
  correctCells = [];

  let totalCells = gridSize * gridSize;

  for (let i = 0; i < totalCells; i++) {
    selected.push(false);
    correctCells.push(random() < 0.25);
  }


  img = createGraphics(width,height);

  for (let y = 0; y < img.height; y += pixelSize) {
    for (let x = 0; x < img.width; x += pixelSize) {

      let brightness = random(50,200);

      img.noStroke();
      img.fill(brightness);
      img.rect(x,y,pixelSize,pixelSize);
    }
  }
}

function drawGrid() {

  let cellSize = width / gridSize;

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {

      let index = x + y * gridSize;

      let px = x * cellSize;
      let py = y * cellSize + 80;

      stroke(120);

      if (selected[index]) {
        fill(100,150,255,150);
      } else {
        fill(60,100);
      }

      rect(px,py,cellSize,cellSize);
    }
  }
}

function mousePressed() {

  if (!started) {
    started = true;

    if (stage > 0) initializeGrid();

    return;
  }

  if (stage === 0 || errorState) return;

  let cellSize = width / gridSize;

  let x = floor(mouseX / cellSize);
  let y = floor((mouseY - 80) / cellSize);

  if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {

    let index = x + y * gridSize;

    selected[index] = !selected[index];

    idleTimer = 0;

    checkCompletion();
  }
}

function checkCompletion() {

  let mistakes = 0;

  for (let i = 0; i < correctCells.length; i++) {
    if (selected[i] !== correctCells[i]) {
      mistakes++;
    }
  }

  let allowedMistakes;

  if (stage === 1) allowedMistakes = 2;
  else if (stage === 2) allowedMistakes = 1;
  else allowedMistakes = 0;

  if (mistakes > allowedMistakes) {
    triggerFailure();
    return;
  }


  let failureChance;

  if (stage === 1) failureChance = 0.1;
  else if (stage === 2) failureChance = 0.2;
  else failureChance = 0.35;

  if (random() < failureChance) {
    triggerFailure();
    return;
  }

  stage = max(stage - 1, 0);

  if (stage > 0) {
    initializeGrid();
  }
}

function triggerFailure() {

  stage = min(stage + 1, maxStage);

  errorState = true;
}