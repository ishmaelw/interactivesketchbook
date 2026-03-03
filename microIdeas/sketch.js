let stage;
let started = false;

let gridSize;
let selected = [];
let correctCells = [];

let idleTimer = 0;
let idleLimit = 180; 
let maxStage = 3;

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
    text("Click to Verify", width / 2, height / 2);
    return;
  }

  
  if (stage > 0) {
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
  }

  if (stage === 0) {
    fill(255);
    textSize(28);
    text("Access Granted", width / 2, height / 2);
    return;
  }

  fill(255);
  textSize(18);
  text("Select all squares containing the object", width / 2, 40);
  drawGrid();
}

function movedRecently() {
  return movedX !== 0 || movedY !== 0;
}

function initializeGrid() {
  gridSize = stage === 1 ? 3 : stage === 2 ? 4 : 6;

  selected = [];
  correctCells = [];

  let totalCells = gridSize * gridSize;

  for (let i = 0; i < totalCells; i++) {
    selected.push(false);
    correctCells.push(random() < 0.25);
  }
}

function drawGrid() {
  let cellSize = width / gridSize;

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      let index = x + y * gridSize;
      let px = x * cellSize;
      let py = y * cellSize + 80;

      stroke(100);

      if (selected[index]) {
        fill(100, 150, 255);
      } else {
        fill(60);
      }

      rect(px, py, cellSize, cellSize);
    }
  }
}

function mousePressed() {
  if (!started) {
    started = true;

    if (stage > 0) {
      initializeGrid();
    }

    return;
  }

  if (stage === 0) return;

  let cellSize = width / gridSize;

  let x = floor(mouseX / cellSize);
  let y = floor((mouseY - 80) / cellSize);

  if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
    let index = x + y * gridSize;
    selected[index] = !selected[index];
  }

  idleTimer = 0; 
  checkCompletion();
}

function checkCompletion() {
  for (let i = 0; i < correctCells.length; i++) {
    if (selected[i] !== correctCells[i]) {
      return;
    }
  }

  stage = max(stage - 1, 0);

  if (stage > 0) {
    initializeGrid();
  }
}