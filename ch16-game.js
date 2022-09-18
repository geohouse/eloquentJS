// . is empty space
// # is a wall
// @ is player starting position
// o is a coin
// + is lava
// = is horizontally moving lava
// | is vertically moving lava
// v is dripping lava

var GAME_LEVELS = [
  `                                                    
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
..................................................................###...........
...................................................##......##....##+##..........
....................................o.o......##..................#+++#..........
.................................................................##+##..........
...................................#####..........................#v#...........
............................................................................##..
..##......................................o.o................................#..
..#.....................o....................................................#..
..#......................................#####.............................o.#..
..#..........####.......o....................................................#..
..#..@.......#..#................................................#####.......#..
..############..###############...####################.....#######...#########..
..............................#...#..................#.....#....................
..............................#+++#..................#+++++#....................
..............................#+++#..................#+++++#....................
..............................#####..................#######....................
................................................................................
................................................................................
`,
  `                                                                     
................................................................................
................................................................................
....###############################.............................................
...##.............................##########################################....
...#.......................................................................##...
...#....o...................................................................#...
...#................................................=.......................#...
...#.o........################...................o..o...........|........o..#...
...#.........................#..............................................#...
...#....o....................##########.....###################....##########...
...#..................................#+++++#.................#....#............
...###############....oo......=o.o.o..#######.###############.#....#............
.....#...............o..o.............#.......#......#........#....#............
.....#....................#############..######.####.#.########....########.....
.....#.............########..............#...........#.#..................#.....
.....#..........####......####...#####################.#..................#.....
.....#........###............###.......................########....########.....
.....#.......##................#########################......#....#............
.....#.......#................................................#....#............
.....###......................................................#....#............
.......#...............o...........................................#............
.......#...............................................o...........#............
.......#########......###.....############.........................##...........
.............#..................#........#####....#######.o.........########....
.............#++++++++++++++++++#............#....#.....#..................#....
.............#++++++++++++++++++#..........###....###...####.o.............#....
.............####################..........#........#......#.....|.........#....
...........................................#++++++++#......####............#....
...........................................#++++++++#.........#........@...#....
...........................................#++++++++#.........##############....
...........................................##########...........................
................................................................................
`,
  `
......................................#++#........................#######....................................#+#..
......................................#++#.....................####.....####.................................#+#..
......................................#++##########...........##...........##................................#+#..
......................................##++++++++++##.........##.............##...............................#+#..
.......................................##########++#.........#....................................o...o...o..#+#..
................................................##+#.........#.....o...o....................................##+#..
.................................................#+#.........#................................###############++#..
.................................................#v#.........#.....#...#........................++++++++++++++##..
.............................................................##..|...|...|..##............#####################...
..............................................................##+++++++++++##............v........................
...............................................................####+++++####......................................
...............................................#.....#............#######........###.........###..................
...............................................#.....#...........................#.#.........#.#..................
...............................................#.....#.............................#.........#....................
...............................................#.....#.............................##........#....................
...............................................##....#.............................#.........#....................
...............................................#.....#......o..o.....#...#.........#.........#....................
...............#######........###...###........#.....#...............#...#.........#.........#....................
..............##.....##.........#...#..........#.....#.....######....#...#...#########.......#....................
.............##.......##........#.o.#..........#....##...............#...#...#...............#....................
.....@.......#.........#........#...#..........#.....#...............#...#...#...............#....................
....###......#.........#........#...#..........#.....#...............#...#####...######......#....................
....#.#......#.........#.......##.o.##.........#.....#...............#.....o.....#.#.........#....................
++++#.#++++++#.........#++++++##.....##++++++++##....#++++++++++.....#.....=.....#.#.........#....................
++++#.#++++++#.........#+++++##.......##########.....#+++++++##+.....#############.##..o.o..##....................
++++#.#++++++#.........#+++++#....o.................##++++++##.+....................##.....##.....................
++++#.#++++++#.........#+++++#.....................##++++++##..+.....................#######......................
++++#.#++++++#.........#+++++##.......##############++++++##...+..................................................
++++#.#++++++#.........#++++++#########++++++++++++++++++##....+..................................................
++++#.#++++++#.........#++++++++++++++++++++++++++++++++##.....+..................................................
`,
  `
..............................................................................................................
..............................................................................................................
..............................................................................................................
..............................................................................................................
..............................................................................................................
........................................o.....................................................................
..............................................................................................................
........................................#.....................................................................
........................................#.....................................................................
........................................#.....................................................................
........................................#.....................................................................
.......................................###....................................................................
.......................................#.#.................+++........+++..###................................
.......................................#.#.................+#+........+#+.....................................
.....................................###.###................#..........#......................................
......................................#...#.................#...oooo...#.......###............................
......................................#...#.................#..........#......#+++#...........................
......................................#...#.................############.......###............................
.....................................##...##......#...#......#................................................
......................................#...#########...########..............#.#...............................
......................................#...#...........#....................#+++#..............................
......................................#...#...........#.....................###...............................
.....................................##...##..........#.......................................................
......................................#...#=.=.=.=....#............###........................................
......................................#...#...........#...........#+++#.......................................
......................................#...#....=.=.=.=#.....o......###.......###..............................
.....................................##...##..........#.....................#+++#.............................
..............................o...o...#...#...........#.....#................##v........###...................
......................................#...#...........#..............#.................#+++#..................
.............................###.###.###.###.....o.o..#++++++++++++++#...................v#...................
.............................#.###.#.#.###.#..........#++++++++++++++#........................................
.............................#.............#...#######################........................................
.............................##...........##.........................................###......................
..###.........................#.....#.....#.........................................#+++#................###..
..#.#.........................#....###....#..........................................###.................#.#..
..#...........................#....###....#######........................#####.............................#..
..#...........................#...........#..............................#...#.............................#..
..#...........................##..........#..............................#.#.#.............................#..
..#.......................................#.......|####|....|####|.....###.###.............................#..
..#................###.............o.o....#..............................#.........###.....................#..
..#...............#####.......##..........#.............................###.......#+++#..........#.........#..
..#...............o###o.......#....###....#.............................#.#........###..........###........#..
..#................###........#############..#.oo.#....#.oo.#....#.oo..##.##....................###........#..
..#......@..........#.........#...........#++#....#++++#....#++++#....##...##....................#.........#..
..#############################...........#############################.....################################..
..............................................................................................................
..............................................................................................................
`,
  `
..................................................................................................###.#.......
......................................................................................................#.......
..................................................................................................#####.......
..................................................................................................#...........
..................................................................................................#.###.......
..........................o.......................................................................#.#.#.......
.............................................................................................o.o.o###.#.......
...................###................................................................................#.......
.......+..o..+................................................#####.#####.#####.#####.#####.#####.#####.......
.......#.....#................................................#...#.#...#.#...#.#...#.#...#.#...#.#...........
.......#=.o..#............#...................................###.#.###.#.###.#.###.#.###.#.###.#.#####.......
.......#.....#..................................................#.#...#.#...#.#...#.#...#.#...#.#.....#.......
.......+..o..+............o..................................####.#####.#####.#####.#####.#####.#######.......
..............................................................................................................
..........o..............###..............................##..................................................
..............................................................................................................
..............................................................................................................
......................................................##......................................................
...................###.........###............................................................................
..............................................................................................................
..........................o.....................................................#......#......................
..........................................................##.....##...........................................
.............###.........###.........###.................................#..................#.................
..............................................................................................................
.................................................................||...........................................
..###########.................................................................................................
..#.........#.o.#########.o.#########.o.##................................................#...................
..#.........#...#.......#...#.......#...#.................||..................#.....#.........................
..#..@......#####...o...#####...o...#####.....................................................................
..#######.....................................#####.......##.....##.....###...................................
........#=..................=................=#...#.....................###...................................
........#######################################...#+++++++++++++++++++++###+++++++++++++++++++++++++++++++++++
..................................................############################################################
..............................................................................................................
`,
];

// top left is 0,0, with each square 1 unit high and wide

let simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;

// Use for 2-dimensional values like position and the size of the actors (moving parts)
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }
  times(factor) {
    return new Vec(this.x * factor, this.y * factor);
  }
}

// Classes for each of the different actors (pieces that can move)
class Player {
  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
  }
  get type() {
    return "player";
  }

  static create(pos) {
    return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
  }
}

Player.prototype.size = new Vec(0.8, 1.5);

class Monster {
  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
  }

  get type() {
    return "monster";
  }

  static create(pos) {
    return new Monster(pos.plus(new Vec(0, -1)), new Vec(2, 0));
  }

  update(time, state) {
    let newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, "wall")) {
      return new Monster(newPos, this.speed);
    } else {
      return new Monster(this.pos, this.speed.times(-1));
    }
  }
}

Monster.prototype.size = new Vec(1.2, 2);

// may need to uncomment depending on whether my translation for the static instance var of size in the class above works or not
//Player.prototype.size = new Vec(0.8, 1.5);

// Set up lava objects to have different movements based on the lava type. If has a reset (dripping),
// will return to its start point when it hits another object, otherwise it 'bounces' back
class Lava {
  constructor(pos, speed, reset) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  get type() {
    return "lava";
  }

  static create(pos, char) {
    if (char === "=") {
      return new Lava(pos, new Vec(2, 0));
    } else if (char === "|") {
      return new Lava(pos, new Vec(0, 2));
    } else if (char === "v") {
      return new Lava(pos, new Vec(0, 3), pos);
    }
  }
}

Lava.prototype.size = new Vec(1, 1);

Lava.prototype.update = function (time, state) {
  let newPos = this.pos.plus(this.speed.times(time));
  if (!state.level.touches(newPos, this.size, "wall")) {
    return new Lava(newPos, this.speed, this.reset);
  } else if (this.reset) {
    // this activates for dripping lava, which has a reset position
    return new Lava(this.reset, this.speed, this.reset);
  } else {
    // This is bouncing lava that flips its speed to look like it's bounced.
    return new Lava(this.pos, this.speed.times(-1));
  }
};

// Coins have slight up/down wobble. To track, it stores a base position, and a wobble property to
// keep track of its wobble location. Together can provide its absolute location.
class Coin {
  constructor(pos, basePos, wobble) {
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
  }
  get type() {
    return "coin";
  }

  static create(pos) {
    let basePos = pos.plus(new Vec(0.2, 0.1));
    // This will give the coin a random starting position on the sin wave that determines the wobble
    // (so not all coins move in the same way in unison)
    return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
  }
}

Coin.prototype.size = new Vec(0.6, 0.6);

const levelChars = {
  ".": "empty",
  "#": "wall",
  "+": "lava",
  "@": Player,
  o: Coin,
  "=": Lava,
  "|": Lava,
  v: Lava,
  M: Monster,
};

// parse and store a level object
class Level {
  constructor(plan) {
    let rows = plan
      .trim()
      .split("\n")
      // destructure the character string into an array of characters
      .map((line) => [...line]);
    console.log(rows);
    this.height = rows.length;
    this.width = rows[0].length;
    this.startActors = [];
    // for each row
    this.rows = rows.map((row, y) => {
      // for each character in each row
      return row.map((char, x) => {
        // levelChars will map background elements (non-moving) to strings, and actor characters (moving) to classes.
        let type = levelChars[char];
        if (typeof type === "string") return type;
        this.startActors.push(type.create(new Vec(x, y), char));
        return "empty";
      });
    });
  }
}

class State {
  constructor(level, actors, status) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  static start(level) {
    return new State(level, level.startActors, "playing");
  }

  get player() {
    return this.actors.find((a) => a.type === "player");
  }
}

// basic testing
// let simpleLevel = new Level(simpleLevelPlan);
// console.log(simpleLevel);
// console.log(`${simpleLevel.width} by ${simpleLevel.height}`);

// attrs is an object
// ...children is the remaining arguments that were passed to elt, packaged as an array
function elt(name, attrs, ...children) {
  let dom = document.createElement(name);
  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }
  for (let child of children) {
    dom.appendChild(child);
  }
  return dom;
}

class DOMDisplay {
  constructor(parent, level) {
    this.dom = elt("div", { class: "game" }, drawGrid(level));
    this.actorLayer = null;
    parent.appendChild(this.dom);
  }
  clear() {
    this.dom.remove();
  }
}

// Sets the scale (in pixels) of one specified distance unit in the game
const scale = 20;

// the ... spreading of the .map() return values spreads them from an array into a
// sequence of values. This sequence of values then gets packed into an array
// when the elt("table",...) call is run (due to spread operator in its parameters),
// and becomes the 'children' array in elt.
// This draws the static background of the game once (as a table of cells)
function drawGrid(level) {
  return elt(
    "table",
    { class: "background", style: `width: ${level.width * scale}px` },
    ...level.rows.map((row) =>
      elt(
        "tr",
        { style: `height: ${scale}px` },
        ...row.map((type) => elt("td", { class: type }))
      )
    )
  );
}

// This is to render the moving elements in the game (lava, player, coins), all as divs.
function drawActors(actors) {
  return elt(
    "div",
    {},
    ...actors.map((actor) => {
      // give multiple classes with the space
      let rect = elt("div", { class: `actor ${actor.type}` });
      rect.style.width = `${actor.size.x * scale}px`;
      rect.style.height = `${actor.size.y * scale}px`;
      rect.style.left = `${actor.pos.x * scale}px`;
      rect.style.top = `${actor.pos.y * scale}px`;
      return rect;
    })
  );
}

// Make the game display show a given state

DOMDisplay.prototype.syncState = function (state) {
  if (this.actorLayer) {
    this.actorLayer.remove();
  }
  // Draw the moveable actor layer
  this.actorLayer = drawActors(state.actors);
  this.dom.appendChild(this.actorLayer);
  // this state addition to the class name is used to style the player
  // depending on whether it hit the lava or won the level
  this.dom.className = `game ${state.status}`;
  // scrollPlayerIntoView is needed to roughly center on the player if the level extends beyond
  // the viewport size.
  this.scrollPlayerIntoView(state);
};

// Find the player's position and update the viewport by scrolling to keep the player in view
DOMDisplay.prototype.scrollPlayerIntoView = function (state) {
  let width = this.dom.clientWidth;
  let height = this.dom.clientHeight;
  // this margin allows an area in the middle of the screen to be explored without triggering
  // any scrolling to center the character. The scrolling only activates when the character is outside
  // the margin envelope wrt the middle of the viewport. This prevent scrolling up/down when jumping, etc.
  let margin = width / 3;

  // This is for the viewport
  let left = this.dom.scrollLeft;
  let right = left + width;
  let top = this.dom.scrollTop;
  let bottom = top + height;

  let player = state.player;
  let center = player.pos.plus(player.size.times(0.5)).times(scale);

  if (center.x < left + margin) {
    this.dom.scrollLeft = center.x - margin;
  } else if (center.x > right - margin) {
    this.dom.scrollLeft = center.x + margin - width;
  }
  if (center.y < top + margin) {
    this.dom.scrollTop = center - margin;
  } else if (center.y > bottom - margin) {
    this.dom.scrollTop = center.y + margin - height;
  }
};

// Display small level
//let display = new DOMDisplay(document.body, simpleLevel);
//display.syncState(State.start(simpleLevel));

// Implement basic collision detection by seeing whether two elements would touch during the
// next drawing update, and changing their movement if they would

Level.prototype.touches = function (pos, size, type) {
  // the x/y start/ends are calculating the dimensions of the cells immediately surrounding the
  // actor.
  let xStart = Math.floor(pos.x);
  let xEnd = Math.ceil(pos.x + size.x);
  let yStart = Math.floor(pos.y);
  let yEnd = Math.ceil(pos.y + size.y);
  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      let isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
      let here = isOutside ? "wall" : this.rows[y][x];
      if (here === type) return true;
    }
  }
  return false;
};

// use the touches method above to check whether the player is touching lava
// keys is a data structure keeping track of which keys are being held down (only the player reads the value of keys)
State.prototype.update = function (time, keys) {
  let actors = this.actors.map((actor) => {
    return actor.update(time, this, keys);
  });
  let newState = new State(this.level, actors, this.status);
  if (newState.status !== "playing") return newState;

  let player = newState.player;
  if (this.level.touches(player.pos, player.size, "lava")) {
    return new State(this.level, actors, "lost");
  }
  for (let actor of actors) {
    if (actor !== player && overlap(actor, player)) {
      newState = actor.collide(newState);
    }
  }
  return newState;
};

//Check for x,y overlap between 2 actors
function overlap(actor1, actor2) {
  return (
    actor1.pos.x + actor1.size.x > actor2.pos.x &&
    actor1.pos.x < actor2.pos.x + actor2.size.x &&
    actor1.pos.y + actor1.size.y > actor2.pos.y &&
    actor1.pos.y < actor2.pos.y + actor2.size.y
  );
}

// lose if touch lava
Lava.prototype.collide = function (state) {
  return new State(state.level, state.actors, "lost");
};

Coin.prototype.collide = function (state) {
  let filtered = state.actors.filter((actor) => actor != this);
  let status = state.status;
  if (!filtered.some((actor) => actor.type === "coin")) status = "won";
  return new State(state.level, filtered, status);
};

Monster.prototype.collide = function (state) {
  // Calculate the locations of the top of the monster and the bottom of the player
  let player = state.actors.filter((actor) => actor.type === "player");
  console.log(player);
  console.log(Player.prototype.size.y);
  let playerBottomPos = player[0].pos.y + Player.prototype.size.y;
  let monsterTopPos = this.pos.y;
  console.log(monsterTopPos);
  console.log(playerBottomPos);
  // If they're within a small distance, then the player defeats the monster (causing it to disappear by being
  // filtered out of the actors used for the new state), otherwise the player loses
  if (Math.abs(playerBottomPos - monsterTopPos) < 0.2) {
    let filteredActors = state.actors.filter((actor) => actor != this);
    return new State(state.level, filteredActors, state.status);
  } else {
    return new State(state.level, state.actors, "lost");
  }
};

// Actor updates
Lava.prototype.update = function (time, state) {
  let newPos = this.pos.plus(this.speed.times(time));
  if (!state.level.touches(newPos, this.size, "wall")) {
    return new Lava(newPos, this.speed, this.reset);
  } else if (this.reset) {
    // this activates for dripping lava, which has a reset position
    return new Lava(this.reset, this.speed, this.reset);
  } else {
    // This is bouncing lava that flips its speed to look like it's bounced.
    return new Lava(this.pos, this.speed.times(-1));
  }
};

// Coins update their wobble only

const wobbleSpeed = 8;
const wobbleDist = 0.07;

Coin.prototype.update = function (time) {
  let wobble = this.wobble + time * wobbleSpeed;
  let wobblePos = Math.sin(wobble) * wobbleDist;
  return new Coin(
    this.basePos.plus(new Vec(0, wobblePos)),
    this.basePos,
    wobble
  );
};

// Player motion handled separately for x, y dimensions

const playerXSpeed = 7;
const gravity = 30;
const jumpSpeed = 17;

Player.prototype.update = function (time, state, keys) {
  let xSpeed = 0;
  if (keys.ArrowLeft) xSpeed -= playerXSpeed;
  if (keys.ArrowRight) xSpeed += playerXSpeed;
  let pos = this.pos;
  let movedX = pos.plus(new Vec(xSpeed * time, 0));
  if (!state.level.touches(movedX, this.size, "wall")) {
    pos = movedX;
  }

  // Adds gravity effects (in positive direction)
  let ySpeed = this.speed.y + time * gravity;
  let movedY = pos.plus(new Vec(0, ySpeed * time));
  if (!state.level.touches(movedY, this.size, "wall")) {
    pos = movedY;
  } else if (keys.ArrowUp && ySpeed > 0) {
    // if falling and hit a wall, allow ability to jump
    ySpeed = -jumpSpeed;
  } else {
    ySpeed = 0;
  }
  return new Player(pos, new Vec(xSpeed, ySpeed));
};

// Gets passed an array of keys to set event listeners for in order to keep
// track of whether those keys have been pressed or not
function trackKeys(keys) {
  let down = Object.create(null);
  function track(event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type === "keydown";
      event.preventDefault();
    }
  }
  window.addEventListener("keydown", track);
  window.addEventListener("keyup", track);

  down.unregister = function () {
    window.removeEventListener("keydown", track);
    window.removeEventListener("keyup", track);
  };
  return down;
}

// Wrapper for requestAnimationFrame. Animation stops when it returns false
function runAnimation(frameFunc) {
  let lastTime = null;
  function frame(time) {
    if (lastTime !== null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      if (frameFunc(timeStep) === false) return;
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function runLevel(level, Display) {
  // Comment out to use the DOM game display
  // let display = new DOMDisplay(document.body, level)
  let display = new CanvasDisplay(document.body, level);
  let state = State.start(level);
  let ending = 1;
  let running = "yes";

  return new Promise((resolve) => {
    function escHandler(event) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      if (running === "no") {
        running = "yes";
        runAnimation(frame);
      } else if (running === "yes") {
        running = "pausing";
      } else {
        running = "yes";
      }
    }
    window.addEventListener("keydown", escHandler);
    // Object with the key names as the keys and boolean of whether they're currently pressed down as the values
    let arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

    function frame(time) {
      if (running === "pausing") {
        running = "no";
        return false;
      }
      state = state.update(time, arrowKeys);
      display.syncState(state);
      if (state.status === "playing") {
        return true;
      } else if (ending > 0) {
        // wait 1 sec after game finishes to let player know what happened, then resolve the playing promise
        ending -= time;
        return true;
      } else {
        display.clear();
        resolve(state.status);
        // Remove the arrow key event handlers
        arrowKeys.unregister();
        window.remove;
        return false;
      }
    }
    runAnimation(frame);
  });
}

async function runGame(plans, Display) {
  // The level incrementor isn't in the for loop def here (only the last ';' to denote where it would go), but instead is only
  // triggered when the current level is beaten, so the current level keeps
  // re-starting when the player dies
  let lives = 3;
  for (let level = 0; level < plans.length; ) {
    console.log(`You have ${lives} remaining}`);
    let status = await runLevel(new Level(plans[level]), Display);
    if (status === "won") {
      level++;
    } else {
      lives--;
    }
  }
  if (lives > 0) {
    console.log("You've won!");
  } else {
    console.log("Game over.");
  }
}

// Full game. Works, but commented out.
//runGame(GAME_LEVELS, DOMDisplay);

// canvas based implementation of the game

class CanvasDisplay {
  constructor(parent, level) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = Math.min(600, level.width * scale);
    this.canvas.height = Math.min(450, level.height * scale);
    parent.appendChild(this.canvas);
    this.cx = this.canvas.getContext("2d");

    this.flipPlayer = false;

    this.viewport = {
      left: 0,
      top: 0,
      width: this.canvas.width / scale,
      height: this.canvas.height / scale,
    };
  }

  clear() {
    this.canvas.remove();
  }
}

CanvasDisplay.prototype.syncState = function (state) {
  this.updateViewport(state);
  this.clearDisplay(state.status);
  this.drawBackground(state.level);
  this.drawActors(state.actors);
};

CanvasDisplay.prototype.updateViewport = function (state) {
  let view = this.viewport;
  let margin = view.width / 3;
  let player = state.player;
  let center = player.pos.plus(player.size.times(0.5));

  // Make sure the center of the display stays within the x, y bounds of the level,
  // and the x,y bounds of the margin area near the center of the screen if at all possible
  if (center.x < view.left + margin) {
    view.left = Math.max(center.x - margin, 0);
  } else if (center.x > view.left + view.width - margin) {
    view.left = Math.min(
      center.x + margin - view.width,
      state.level.width - view.width
    );
  }
  if (center.y < view.top + margin) {
    view.top = Math.max(center.y - margin, 0);
  } else if (center.y > view.top + view.height - margin) {
    view.top = Math.min(
      center.y + margin - view.height,
      state.level.height - view.height
    );
  }
};

// use brighter or darker colors for the fill if the game is won or lost
CanvasDisplay.prototype.clearDisplay = function (status) {
  if (status === "won") {
    this.cx.fillStyle = "rgb(68,191,255)";
  } else if (status === "lost") {
    this.cx.fillStyle = "rgb(44,136,214)";
  } else {
    this.cx.fillStyle = "rgb(52,166,251)";
  }
  this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

// Figure out which tiles are visible in the current viewport and render those

let otherSprites = document.createElement("img");
otherSprites.src = "./img/sprites.png";

CanvasDisplay.prototype.drawBackground = function (level) {
  let { left, top, width, height } = this.viewport;
  let xStart = Math.floor(left);
  let xEnd = Math.ceil(left + width);
  let yStart = Math.floor(top);
  let yEnd = Math.ceil(top + height);

  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      let tile = level.rows[y][x];
      if (tile === "empty") {
        continue;
      }
      let screenX = (x - left) * scale;
      let screenY = (y - top) * scale;
      // Determines the x location for the cut rectangle in the sprites image file
      let tileX = tile === "lava" ? scale : 0;
      // cut out the correct sprite (either lava or wall) and place it on the screen with the correct scale
      // This doesn't wait for the sprite to finish loading, but if it isn't finished, the only thing that happens
      // is that the drawing isn't rendered (not a big deal for a few frames). Once it does finish loading,
      // the sprites will be picked up and used in each render after.
      this.cx.drawImage(
        otherSprites,
        tileX,
        0,
        scale,
        scale,
        screenX,
        screenY,
        scale,
        scale
      );
    }
  }
};

// Render the player using the action sprites. #1-8 are cycled when walking, #9 is at rest, and # 10
// is used when jumping (when the y velocity !== 0). The sprites are wider than the player object (24px instead of 16px),
// so use `playerXOverlap` to adjust the x-coordinates and width.

let playerSprites = document.createElement("img");
playerSprites.src = "./img/player.png";
// overlap in each direction. Object width = 16 + 2 * overlap of 4 = the 24px width of the sprites.
const playerXOverlap = 4;

// Makes a flip by moving the axis to `around`, then flipping, the restoring the axis to its original location.
// Because canvas works with cumulative side-effects instead of returned values for drawing, this will flip
// the canvas for any calls that come after it, without its needing to return anything from this function.
function flipHorizontally(context, around) {
  context.translate(around, 0);
  context.scale(-1, 1);
  context.translate(-around, 0);
}

CanvasDisplay.prototype.drawPlayer = function (player, x, y, width, height) {
  width += playerXOverlap * 2;
  x -= playerXOverlap;
  if (player.speed.x !== 0) {
    // boolean for whether the sprite (which is right-facing) needs to be flipped (if it's moving to the left)
    this.flipPlayer = player.speed.x < 0;
  }
  // default is tile 8 (at rest)
  let tile = 8;

  // if the player is jumping
  if (player.speed.y !== 0) {
    tile = 9;
  } else if (player.speed.x !== 0) {
    // get the tile number for walking based on the time in the range of 0-7
    tile = Math.floor(Date.now() / 60) % 8;
  }

  this.cx.save();
  if (this.flipPlayer) {
    flipHorizontally(this.cx, x + width / 2);
  }
  // Get the x axis of the necessary sprite start point
  let tileX = tile * width;
  this.cx.drawImage(
    playerSprites,
    tileX,
    0,
    width,
    height,
    x,
    y,
    width,
    height
  );
  this.cx.restore();
};

CanvasDisplay.prototype.drawActors = function (actors) {
  for (let actor of actors) {
    let width = actor.size.x * scale;
    let height = actor.size.y * scale;
    // Get x and y relative to the top left of the level (not viewport)
    let x = (actor.pos.x - this.viewport.left) * scale;
    let y = (actor.pos.y - this.viewport.top) * scale;
    if (actor.type === "player") {
      this.drawPlayer(actor, x, y, width, height);
    } else {
      // set the tile offset in the sprites file. These are ONLY the actors here,
      // which are the things (other than the player) that can move - the
      // coins move up and down, and the lava, depending on its type,
      // can move side to side or up and down. We don't need to worry about
      // rendering the walls here, because they don't move and therefore
      // are rendered in the background render call instead, so can just use
      // a ternary operator to switch between the coin and the lava tile in the sprites file.
      let tileX = (actor.type === "coin" ? 2 : 1) * scale;
      this.cx.drawImage(
        otherSprites,
        tileX,
        0,
        width,
        height,
        x,
        y,
        width,
        height
      );
    }
  }
};

runGame(GAME_LEVELS, CanvasDisplay);

// Monster
const monsterLevel = `
..................................
.################################.
.#..............................#.
.#..............................#.
.#..............................#.
.#...........................o..#.
.#..@...........................#.
.##########..............########.
..........#..o..o..o..o..#........
..........#...........M..#........
..........################........
..................................
`;

// Works, but commented out
//runLevel(new Level(monsterLevel));
