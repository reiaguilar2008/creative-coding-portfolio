let numclick = [0,0,0,0];
let neonpink=[255,19,240]
let neongreen=[44,255,5]
let Purple=[103,0,255]
let colors=["white",neonpink,neongreen,Purple,"red","blue","cyan"]
let boxcolour = [[], [], [], []];
let boxes = [];
let numbers = [];
let clockFont;
function setup() {
  createCanvas(windowWidth, windowHeight);
  clockFont = loadFont("digital-7.ttf");
  rectMode(CENTER);
}

function draw() {
  background(0);

  //time container
  stroke("white");
  strokeWeight(5);
  fill(0);
  rect(width / 2, height / 2 + 110, 600, 120);

  line(width / 2 - 300, 50, width / 2 + 300, 50);

  //time
  fill("white");
  noStroke();
  textFont(clockFont);
  textAlign(CENTER, CENTER);
  textSize(100);
  let Hour = hour();
  let min = minute();
  if (min < 10) {
    min = "0" + min;
  }
  let minText = nf(min, 2);
  let minFirst = minText[0];
  let minSecond = minText[1];
  Hour = Hour % 12;
  if (Hour === 0) {
    Hour = 12;
  }
  let HourText = nf(Hour, 2);
  let Hourten = HourText[0];
  let Hour1 = HourText[1];
  text(Hourten, width / 2 - 200, height / 2 + 100);
  text(Hour1, width / 2 - 100, height / 2 + 100);
  text(":", width / 2, height / 2 + 100);
  text(minFirst, width / 2 + 100, height / 2 + 100);
  text(minSecond, width / 2 + 200, height / 2 + 100);
  //time measure boxes
  fill(colors[numclick[0]]);
  drawboxes(int(Hourten), width / 2 - 200, height / 2 + 25);
  fill(colors[numclick[1]]);
  drawboxes(int(Hour1), width / 2 - 100, height / 2 + 25);
  fill(colors[numclick[2]]);
  drawboxes(int(minFirst), width / 2 + 100, height / 2 + 25);
  fill(colors[numclick[3]]);
  drawboxes(int(minSecond), width / 2 + 200, height / 2 + 25);
}
//colour boxes, like volume measure but time
function drawboxes(amount, x, y) {
  for (let i = 0; i < amount; i++) {
    rect(x, y - i * 30, 20, 20);
  }
}
//row colour changes if number pressed
function mousePressed() {
  if (
    mouseX > width / 2 - 240 &&
    mouseX < width / 2 - 160 &&
    mouseY > height / 2 + 40 &&
    mouseY < height / 2 + 140
  ) {
    numclick[0] = numclick[0]+1;
    if(numclick[0]>=colors.length){
      numclick[0]=0;
    }
  }

  if (
    mouseX > width / 2 - 140 &&
    mouseX < width / 2 - 60 &&
    mouseY > height / 2 + 40 &&
    mouseY < height / 2 + 140
  ) {
    numclick[1] = numclick[1]+1;
    if(numclick[1]>=colors.length){
      numclick[1]=0;
    }
  }

  if (
    mouseX > width / 2 + 60 &&
    mouseX < width / 2 + 140 &&
    mouseY > height / 2 + 40 &&
    mouseY < height / 2 + 140
  ) {
    numclick[2] = numclick[2]+1;
    if(numclick[2]>=colors.length){
      numclick[2]=0;
    }
  }

  if (
    mouseX > width / 2 + 160 &&
    mouseX < width / 2 + 240 &&
    mouseY > height / 2 + 40 &&
    mouseY < height / 2 + 140
  ) {
    numclick[3] = numclick[3]+1;
    if(numclick[3]>=colors.length){
      numclick[3]=0;
    }
  }
}
