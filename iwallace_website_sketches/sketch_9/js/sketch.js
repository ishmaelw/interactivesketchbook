let images = [];
let currentIndex = 0;

let autoMode = false;
let autoTimer = 0;
let autoInterval = 120; 

let stageLabels = [
  "Stage 1: summer",
  "Stage 2: spring",
  "Stage 3: autumn",
  "Stage 4: winter",
  "Stage 5: extended winter"
];

function preload() {
  for (let i = 1; i <= 5; i++) {
    images.push(loadImage("img/img" + i + ".jpg"));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);

  displayImage();
  displayStateInfo();
  displayProgressBar();

  if (autoMode) {
    handleAutoAdvance();
  }
}



function displayImage() {
  let img = images[currentIndex];

  let canvasRatio = width / height;
  let imgRatio = img.width / img.height;

  let drawWidth, drawHeight;

  if (imgRatio > canvasRatio) {
    drawWidth = width;
    drawHeight = width / imgRatio;
  } else {
    drawHeight = height;
    drawWidth = height * imgRatio;
  }

  image(img, width / 2, height / 2, drawWidth, drawHeight);
}

function displayStateInfo() {
  fill(255);
  textSize(18);
  text(stageLabels[currentIndex], width / 2, 40);

  textSize(14);
  text(
    "Image " + (currentIndex + 1) + " / " + images.length,
    width / 2,
    height - 60
  );

  if (autoMode) {
    fill(0, 255, 0);
    text("AUTO MODE ON (Press a to turn on)", width / 2, height - 30);
  } else {
    fill(255);
    text("Press ← → to navigate | Press a for auto mode", width / 2, height - 30);
  }
}

function displayProgressBar() {
  let barWidth = width * 0.6;
  let barHeight = 8;
  let x = width / 2 - barWidth / 2;
  let y = height - 45;


  fill(80);
  rect(x, y, barWidth, barHeight);


  let progress = (currentIndex + 1) / images.length;
  fill(255);
  rect(x, y, barWidth * progress, barHeight);
}



function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    nextImage();
  }

  if (keyCode === LEFT_ARROW) {
    previousImage();
  }

  if (key === 'a' || key === 'A') {
    autoMode = !autoMode;
    autoTimer = 0;
  }
}

function nextImage() {
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
}

function previousImage() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
}

function handleAutoAdvance() {
  autoTimer++;

  if (autoTimer >= autoInterval) {
    nextImage();
    autoTimer = 0;
  }
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
