let stage;
let started = false;

let idleTimer = 0;
let idleLimit = 180;

let errorState = false;
let errorTimer = 0;
let errorDuration = 120;

let img;
let pixelSize = 10;

let maxStage = 4;

function setup() {
  createCanvas(500, 500);
  textAlign(CENTER, CENTER);

  // hidden starting bias
  stage = floor(random(0,3));

  generatePixelBackground();
}

function draw() {

  if (!started) {
    background(20);
    fill(255);
    textSize(24);
    text("Click to Begin Verification", width/2, height/2);
    return;
  }

  // ACCESS GRANTED
  if (stage === 0) {
    background(40,200,80);
    fill(255);
    textSize(32);
    text("ACCESS GRANTED", width/2, height/2);
    return;
  }

  // ERROR SCREEN
  if (errorState) {
    background(30);
    fill(255,80,80);
    textSize(28);
    text("Verification Failed", width/2, height/2);

    errorTimer++;

    if (errorTimer > errorDuration) {
      errorState = false;
      errorTimer = 0;
      generatePixelBackground();
    }

    return;
  }


  image(img,0,0);

  fill(255);
  textSize(18);
  text("Confirm you are human", width/2,40);
  text("Click Puzzle to verify", width/2,65);


  if (movedRecently()) {
    idleTimer = 0;
  } else {
    idleTimer++;
  }

  if (idleTimer > idleLimit) {
    stage = min(stage + 1, maxStage);
    idleTimer = 0;
    generatePixelBackground();
  }

}

function mousePressed(){

  if (!started){
    started = true;
    return;
  }

  if (stage === 0 || errorState) return;

  idleTimer = 0;

  attemptVerification();
}

function attemptVerification(){

  let failureChance;

  if (stage === 1) failureChance = 0.15;
  else if (stage === 2) failureChance = 0.30;
  else if (stage === 3) failureChance = 0.50;
  else failureChance = 0.70;

  if (random() < failureChance){
    triggerFailure();
    return;
  }

  stage = max(stage - 1,0);

}

function triggerFailure(){

  stage = min(stage + 1, maxStage);

  errorState = true;
}

function movedRecently(){
  return movedX !== 0 || movedY !== 0;
}

function generatePixelBackground(){

  img = createGraphics(width,height);

  for (let y = 0; y < height; y += pixelSize){
    for (let x = 0; x < width; x += pixelSize){

      let brightness = random(50,200);

      img.noStroke();
      img.fill(brightness);
      img.rect(x,y,pixelSize,pixelSize);

    }
  }

}