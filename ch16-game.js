// . is empty space
// # is a wall
// @ is player starting position
// o is a coin
// + is lava
// = is horizontally moving lava
// | is vertically moving lava
// v is dripping lava

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
  times(other) {
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

const levelChars = {
  ".": "empty",
  "#": "wall",
  "+": "lava",
  "@": Player,
  o: Coin,
  "=": Lava,
  "|": Lava,
  v: Lava,
};

// basic testing
let simpleLevel = new Level(simpleLevelPlan);
console.log(simpleLevel);
console.log(`${simpleLevel.width} by ${simpleLevel.height}`);

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
// when the elt("table"...) call is run (due to spread operator in its parameters),
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
let display = new DOMDisplay(document.body, simpleLevel);
display.syncState(State.start(simpleLevel));
