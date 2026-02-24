let fastHeight = 10;
let slowHeight = 10;

let slowQueue = 0;
let delayFrames = 60;
let delayTimer = 0;

function setup() {
  createCanvas(500, 300);
}

function draw() {
  background(30);

  
  if (slowQueue > 0) {
    delayTimer++;

    if (delayTimer >= delayFrames) {
      slowHeight += slowQueue;
      slowQueue = 0;
      delayTimer = 0;
    }
  }

 
  fill(100, 200, 255);
  rect(120, height - fastHeight, 80, fastHeight);

  fill(255, 120, 120);
  rect(300, height - slowHeight, 80, slowHeight);


  fill(255);
  textAlign(CENTER);
  textSize(16);
  text("Instant: " + fastHeight, 160, 30);
  text("Delayed: " + slowHeight, 340, 30);
}

function keyPressed() {
  fastHeight += 10;    
  slowQueue += 10;      
}
