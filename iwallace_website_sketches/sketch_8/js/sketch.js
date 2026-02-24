let images = [];
let currentIndex = 0;

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


  fill(255);
  textSize(16);
  text(
    "Image " + (currentIndex + 1) + " of " + images.length,
    width / 2,
    height - 30
  );

  textSize(14);
  text("Use LEFT and RIGHT arrow keys to navigate", width / 2, 30);
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    currentIndex++;
    

    if (currentIndex >= images.length) {
      currentIndex = 0;
    }
  }

  if (keyCode === LEFT_ARROW) {
    currentIndex--;
    

    if (currentIndex < 0) {
      currentIndex = images.length - 1;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}