let player1;
let player2;
let neonpink = [255, 19, 240];
let gamestart = false;
let obstacle1;
let obstacle2;
let gameover = false;
let winner = "";
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  player1 = new Geobox(100, height / 2 - 30, "cyan");
  player2 = new Geobox(100, height - 30, neonpink);
  textfont = loadFont("font.ttf");
  obstacle1 = new Obstacle(height / 2);
  obstacle2 = new Obstacle(height);
}

function draw() {
  background(0);
  stroke("white");
  strokeWeight(6);
  line(0, height / 2, width, height / 2);
  line(0, height, width, height);
  player1.show();
  player2.show();
  if (gamestart == false) {
    fill("white");
    noStroke();
    textAlign(LEFT, CENTER);
    textFont(textfont);
    textSize(30);
    text("Player 1 :SHIFT to jump", 10, height / 2 - 250);
    text("Player 2 :ENTER to jump", 10, height / 2 + 80);

    stroke("white");
    strokeWeight(8);
    fill(0);
    rect(width / 2, height / 2, 420, 70);
    noStroke();
    fill("white");
    textSize(48);
    textAlign(CENTER, CENTER);
    text("Press SPACE to start", width / 2, height / 2 - 6);
  }
  if (gamestart == true && gameover == false) {
    player1.releaseMove();
    player2.releaseMove();
    player1.move();
    player2.move();
    obstacle1.move();
    obstacle1.show();
    obstacle2.move();
    obstacle2.show();
    if (player1.hits(obstacle1)) {
      gameover = true;
      winner = "Player 2";
    }
    if (player2.hits(obstacle2)) {
      gameover = true;
      winner = "Player 1";
    }
  }
  if (gameover == true) {
    stroke("white");
    strokeWeight(8);
    fill(0);
    rect(width/2,height/2,500,200);
    fill("white");
    noStroke();
    textAlign(CENTER, CENTER);
    textFont(textfont);
    textSize(55);
    text("GAME OVER", width / 2, height / 2-35);
    textSize(40)
    text("Winner:"+winner,width/2,height/2+35)
  }
}

function keyPressed() {
  if (key == " ") {
    if(gameover==true){
      location.reload();
    } else{
      gamestart = true;
    }
  }
  if (gamestart == true) {
    if (keyCode == SHIFT) {
      player1.jump();
    }
    if (keyCode == ENTER) {
      player2.jump();
    }
  }
}

class Geobox {
  constructor(x, y, colour) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.colour = colour;
    this.startX = x;
    this.releaseX = x + 35;
    this.startY = y;
    this.vy = 0;
    this.gravity = 1;
  }

  jump() {
    if (this.y == this.startY) {
      this.vy = -16;
    }
  }
  move() {
    this.y += this.vy;
    this.vy += this.gravity;
    if (this.y > this.startY) {
      this.y = this.startY;
      this.vy = 0;
    }
  }

  hits(obstacle) {
    let playerLeft = this.x - this.size / 2;
    let playerRight = this.x + this.size / 2;
    let playerTop = this.y - this.size / 2;
    let playerBottom = this.y + this.size / 2;

    let obsLeft = obstacle.x - obstacle.w / 2;
    let obsRight = obstacle.x + obstacle.w / 2;
    let obsTop = obstacle.y - obstacle.h / 2;
    let obsBottom = obstacle.y + obstacle.h / 2;

    return (
      playerRight > obsLeft &&
      playerLeft < obsRight &&
      playerBottom > obsTop &&
      playerTop < obsBottom
    );
  }

  show() {
    fill(this.colour);
    noStroke();
    rect(this.x, this.y, this.size, this.size);
  }

  releaseMove() {
    if (this.x < this.releaseX) {
      this.x += 2.5;
    }
  }
}

class Obstacle {
  constructor(groundY) {
    this.w = 35;
    this.h = 45;
    this.x = width;
    this.y = groundY - this.h / 2;
    this.speed = 6;
  }
  move() {
    this.x -= this.speed;
    if (this.x < -this.w) {
      this.x = width + random(100, 400);
    }
  }
  show() {
    fill("white");
    triangle(
      this.x - this.w / 2,
      this.y + this.h / 2,
      this.x + this.w / 2,
      this.y + this.h / 2,
      this.x,
      this.y - this.h / 2
    );
  }
}
