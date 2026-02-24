function setup() {
  createCanvas(500, 500);
  background(255, 240, 220);
}

function draw() {

  fill(200, 240, 220, 0); 
  rect(0, 0, width, height);

  fill(255, 150, 80, 60);
  noStroke();
  circle(mouseX, mouseY, 40);
}
