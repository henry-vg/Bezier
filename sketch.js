const p = [];
let cur = null;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 4; i++) {
    p.push(new pointObject(random(width), random(height), 15));
  }
}

function draw() {
  background(255);

  let hand = false;
  for (let i = 0; i < p.length; i++) {
    if (dist(mouseX, mouseY, p[i].x, p[i].y) < p[i].d / 2) {
      hand = true;
      break;
    }
  }
  if (hand) {
    cursor(HAND);
  }
  else {
    cursor(ARROW);
  }

  if (mouseIsPressed && cur == null) {
    for (let i = 0; i < p.length; i++) {
      if (dist(mouseX, mouseY, p[i].x, p[i].y) < p[i].d / 2) {
        cur = p[i];
        break;
      }
    }
  }
  else if (!mouseIsPressed) {
    cur = null;
  }
  if (cur != null) {
    cur.x += mouseX - pmouseX;
    cur.y += mouseY - pmouseY;
  }

  noFill();
  stroke(0);
  strokeWeight(2);

  myBezier(p[0].x, p[0].y, p[1].x, p[1].y, p[2].x, p[2].y, p[3].x, p[3].y);

  p[0].connect(p[1]);
  p[3].connect(p[2]);

  p[1].show();
  p[2].show();
  p[0].show();
  p[3].show();
}

function myBezier(x0, y0, x1, y1, x2, y2, x3, y3) {
  const delta = 0.02;
  beginShape();
  for (let i = 0; i <= 1 + delta; i += delta) {
    const x = pow(1 - i, 3) * x0 + 3 * i * pow(1 - i, 2) * x1 + 3 * pow(i, 2) * (1 - i) * x2 + pow(i, 3) * x3,
      y = pow(1 - i, 3) * y0 + 3 * i * pow(1 - i, 2) * y1 + 3 * pow(i, 2) * (1 - i) * y2 + pow(i, 3) * y3;
    vertex(x, y);
  }
  endShape();
}

class pointObject {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.state = 0;
  }
  show() {
    noStroke();
    if (this == p[0] || this == p[3]) {
      fill(255, 0, 0);
    }
    else {
      fill(0, 0, 255);
    }
    circle(this.x, this.y, this.d);
  }
  connect(point) {
    stroke(100);
    strokeWeight(1);

    line(this.x, this.y, point.x, point.y);
  }
}