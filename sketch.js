let brush = 1;
let paintLayer;
let font;
let brushColour = "black";
let colourBlobs = [
  { x: 1200, y: 100, c: "black" },
  { x: 1200, y: 150, c: "darkred" },
  { x: 1200, y: 200, c: "lightblue" },
  { x: 1200, y: 250, c: "hotpink" },
  { x: 1200, y: 300, c: "purple" }
];
function preload() {
  font = loadFont("Creative Wonder.otf");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  paintLayer = createGraphics(windowWidth, windowHeight);
  paintLayer.clear();
  drawLabel();
  drawColourBlobs();
}

function draw() {
  if (mouseIsPressed&&mouseButton==LEFT) {
    if (brush == 1) {
      circleBrush();
    }
    if (brush == 2) {
      squareBrush();
    }
    if (brush == 3) {
      splatterBrush();
    }
    if (brush == 4) {
      lineBrush();
    }
  }
  image(paintLayer, 0, 0);
}
function keyPressed() {
  if (key == "1") {
    brush = 1;
    drawLabel();
    drawColourBlobs();
  }
  if (key == "2") {
    brush = 2;
    drawLabel();
    drawColourBlobs();
  }
  if (key == "3") {
    brush = 3;
    drawLabel();
    drawColourBlobs();
  }
  if (key == "4") {
    brush = 4;
    drawLabel();
    drawColourBlobs();
  }
  if (key == "c" || key == "C") {
    background(255);
    drawLabel();
    paintLayer.clear();
    drawColourBlobs();
  }
}

function circleBrush() {
  paintLayer.fill(brushColour);
  paintLayer.noStroke();
  paintLayer.ellipse(mouseX, mouseY, 30, 30);
}

function squareBrush() {
  paintLayer.fill(brushColour);
  paintLayer.noStroke();
  paintLayer.rectMode(CENTER);
  paintLayer.rect(mouseX, mouseY, 30, 30);
}

function splatterBrush() {
  paintLayer.noStroke();

  for (let i = 0; i < 5; i++) {
    let splatterX = mouseX + random(-20, 20);
    let splatterY = mouseY + random(-20, 20);
    let splatterSize = random(5, 15);

    paintLayer.fill(brushColour);
    paintLayer.ellipse(splatterX, splatterY, splatterSize, splatterSize);
  }
}

function lineBrush() {
  paintLayer.stroke(brushColour);
  paintLayer.strokeWeight(5);
  paintLayer.line(pmouseX, pmouseY, mouseX, mouseY);
}
function drawLabel() {
  push();

  rectMode(CORNER);
  noStroke();
  fill(255);
  rect(0, 0, width, 50);

  fill(0);
  textFont(font);
  textSize(30);
  textAlign(CENTER, CENTER);

  text("1-", width/2-60, 25);
  ellipse(width/2-30, 32, 15, 15);

  text("2-", width/2+30, 25);
  rectMode(CENTER);
  rect(width/2+60, 32, 15, 15);

  text("3-", width/2+120, 25);
  text("*", width/2+150, 32);

  text("4-", width/2+210, 25);
  stroke(0);
  strokeWeight(4);
  ellipse(width/2+240, 32, 2, 2);

  noStroke();
  text("C-clear", width/2+320, 25);
  text("Using brush: " + brush, width/2-300, 25);
  pop();
}
function drawColourBlobs() {
  for (let blob of colourBlobs) {
    fill(blob.c);
    stroke(0);
    strokeWeight(2);
    ellipse(blob.x, blob.y, 30, 30);
  }
}
function mousePressed() {
  if (mouseButton == RIGHT) {
    for (let blob of colourBlobs) {
      let d = dist(mouseX, mouseY, blob.x, blob.y);

      if (d < 15) {
        brushColour = blob.c;
      }
    }

    return false;
  }
}