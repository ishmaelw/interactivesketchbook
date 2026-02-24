let size = 20;

function setup() {
  createCanvas(600, 200);
}

function draw() {
  background(220);


  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    size += 10;
  }

  else {
    size -= 1;
  }

 
  size = constrain(size, 10, 150);

  fill(0);
  ellipse(width / 2, height / 2, size, size);
}
