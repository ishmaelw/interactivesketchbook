let x, y;

function setup() {
  createCanvas(500, 500);
  x = width / 2;
  y = height / 2;
}

function draw() {
  background(240);


  x += (mouseX - x) * 0.03;
  y += (mouseY - y) * 0.03;

  fill(0);
  noStroke();
  circle(x, y, 60);
}
