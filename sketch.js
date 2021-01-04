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
// Sliders
let rowSlider, colSlider, pegSlider, plinkoSlider;
let rowNum, colNum, pegSize, plinkoSize;
// Score
let score = 0;

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
      let lableB = pairs[i].bodyB;

      if (labelA === "particle" && labelB === "plinko") {
        // Do something
      }
      if (labelA === "plinko" && labelB === "particle") {
        // DO the thing above
      }
    }
  }
  Events.on(engine, "collisionStart", collision);

  // Slidders
  rowSlider = createSlider(5, 20, 10);
  rowSlider.position(20, 850);

  colSlider = createSlider(5, 20, 11);
  colSlider.position(20, 920);

  pegSlider = createSlider(0, 20, 10);
  pegSlider.position(20, 980);

  plinkoSlider = createSlider(4, 16, 6);
  plinkoSlider.position(20, 1050);

  // The Bodies
  newParticle(); // peg

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

  // Customization
  createP("Number of Rows");
  createP("Number of Columns");
  createP("Peg Size");
  createP("Plinko Size");

  // Runnign the engine
  Engine.run(engine, 1000 / 60);
}

function draw() {
  background(255, 105, 180);

  // SOme slider values
  let rowNum = rowSlider.value();
  let colNum = colSlider.value();
  let pegSize = pegSlider.value();
  let plinkoSize = plinkoSlider.value();

  // Some Annotations
  fill("white");
  textStyle(BOLD);
  textFont("VT323");
  textSize(200);
  text("PL!NKO!", 35, 400);

  // Score
  textSize(30);
  text("500", 10, 700);
  text("500", 555, 700);

  text("400", 65, 700);
  text("400", 500, 700);

  text("300", 120, 700);
  text("300", 445, 700);

  text("200", 175, 700);
  text("200", 395, 700);

  text("100", 283, 700);

  text("50", 235, 700);
  text("50", 340, 700);

  text("Score: " + score, width / 2 - 50, 460);

  // Spawning a plinko every 40 frames
  if (frameCount % 30 === 0) {
    newParticle();
  }

  // Pegs
  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
    particles[i].score();
    if (particles[i].isOffScreen()) {
      World.remove(world, particles[i].body);
      particles.splice(i, 1);
      i--;
    }
  }
  // Plinko
  for (let i = 0; i < plinkos.length; i++) {
    plinkos[i].show();
  }
  for (let i = 0; i < bounds.length; i++) {
    bounds[i].show();
  }
}

// Create a plinkos
function newParticle() {
  var p = new Particle(300, 0, 10);
  particles.push(p);
}
