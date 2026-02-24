let y;

function setup() {
  createCanvas(500, 500);
  y = height / 5;
}

function draw() {
  background(230);


  y += 0.2;
  y = constrain(y, height / 5, height - 0);

  fill(120);
  noStroke();
  circle(mouseX, y, 50);
}
