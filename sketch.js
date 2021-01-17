// Making the alias for moduels
const { Engine, World, Bodies, Body, Events } = Matter;

// The Engine and World.
let engine, world;

// The particles, Plinkos and boundaries
let particles = [];
let plinkos = [];
let bounds = [];

//Rows and Colums
let cols = 11;
let rows = 10;

// The Bodies
let p, pl, b;

// Score & gameState
let score = 0;
gameState = "play";

function setup() {
  createCanvas(600, 800);

  // Making a Enfine and World
  engine = Engine.create();
  world = engine.world;

  // Collision Event
  function collision(event) {
    let pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      let labelA = pairs[i].bodyA;
      let labelB = pairs[i].bodyB;

      if (labelA === "particle" && labelB === "plinko") {
        // Do something
      }
      if (labelA === "plinko" && labelB === "particle") {
        // Do the thing above
      }
    }
  }
  Events.on(engine, "collisionStart", collision);

  // Plinkos
  let spacing = width / cols;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = spacing / 2 + i * spacing;
      if (j % 2 === 1) {
        x += spacing / 2;
      }
      let y = spacing + j * spacing;
      let pl = new Plinko(x, y, 6);
      plinkos.push(pl);
    }
  }

  // Boundries
  let b = new Boundary(width / 2, height + 50, width, 100);
  bounds.push(b);
  for (let i = 0; i < cols + 1; i++) {
    var x = i * spacing;
    var h = 120;
    var w = 10;
    var y = height - h / 2;
    let b = new Boundary(x, y, w, h);
    bounds.push(b);
  }
  // Runnign the engine
  Engine.run(engine, 1000 / 60);
}

function draw() {
  background(255, 105, 180);

  // Some Annotations
  fill("white");
  textStyle(BOLD);
  textFont("VT323");
  textSize(200);
  text("PL!NKO!", 35, 400);

  // Score
  textSize(30);
  text("500", 10, 700); // 500
  text("500", 555, 700);
  text("400", 65, 700); // 400
  text("400", 500, 700);
  text("300", 120, 700); // 300
  text("300", 445, 700);
  text("200", 175, 700); // 200
  text("200", 395, 700);
  text("50", 235, 700); // 50
  text("50", 340, 700);
  text("100", 283, 700); // 100
  text("Score: " + score, width / 2 - 50, 460); // Score

  // Pegs/ Particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
    particles[i].score();
    if (particles[i].isOffScreen()) {
      World.remove(world, particles[i].body);
      particles.splice(i, 1);
      i--;
    }
  }

  // Plnko
  for (let i = 0; i < plinkos.length; i++) {
    plinkos[i].show();
  }
  // Buckets
  for (let i = 0; i < bounds.length; i++) {
    bounds[i].show();
  }

  if (particles.length === 5) {
    gameState = "end";
  }
}

// Create a plinkos
function newParticle() {
  var p = new Particle(300, 0, 10);
  particles.push(p);
}

function keyPressed() {
  if (keyCode === 32) {
    if (gameState === "play") {
      newParticle();
    }
  }
}
