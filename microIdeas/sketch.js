let flagged;
let verified = false;

function setup() {
  createCanvas(600, 400);
  flagged = random() < 0.5;
}

function draw() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);

  if (!flagged || verified) {
    text("Access Granted", width/2, height/2);
  } else {
    text("Please verify you are human.\nClick to continue.", width/2, height/2);
  }
}

function mousePressed() {
  if (flagged) {
    verified = random() < 0.3; 
  }
}