class Particle {
  constructor(x, y, r) {
    var options = {
      restitution: 0.5,
      friction: 0,
      density: 1,
    };
    x += random(-10, 10);
    this.body = Bodies.circle(x, y, r, options);
    this.body.label = "this.";
    World.add(world, this.body);
    this.r = r;
  }

  isOffScreen() {
    var x = this.body.position.x;
    var y = this.body.position.y;
    return x < -50 || x > width + 50;
  }

  show() {
    let pos = this.body.position;
    noStroke();
    fill("yellow");
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
  }

  score() {
    let pos = this.body.position;
    // 500
    if (pos.y > 700 && pos.y > 710 && pos.x < 10 && pos.x > 0) {
      score = score + 1;
    }
    if (pos.y > 700 && pos.y > 710 && pos.x < 555 && pos.x > 500) {
      score = score + 1;
    }

    // 400
    if (pos.y > 700 && pos.y > 710 && pos.x < 120 && pos.x > 65) {
      score += 1;
    }
    if (pos.y > 700 && pos.y > 710 && pos.x < 500 && pos.x > 445) {
      score += 1;
    }

    // 300
    if (pos.y > 700 && pos.y > 710 && pos.x < 175 && pos.x > 120) {
      score += 1;
    }
    if (pos.y > 700 && pos.y > 710 && pos.x < 175 && pos.x > 120) {
      score += 1;
    }

    // 200
    if (pos.y > 700 && pos.y > 710 && pos.x < 175 && pos.x > 120) {
      score += 1;
    }

    if (pos.y > 700 && pos.y > 710 && pos.x < 175 && pos.x > 120) {
      score += 1;
    }
    // 100
    if (pos.y > 700 && pos.y > 710 && pos.x < 235 && pos.x > 283) {
      score += 1;
    }

    // 50
    if (pos.y > 700 && pos.y > 710 && pos.x < 10 && pos.x > 0) {
      score += 1;
    }
  }
}
