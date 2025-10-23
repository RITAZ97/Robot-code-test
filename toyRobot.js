// Functions: 
const readline = require("readline");
const directions = ["NORTH", "EAST", "SOUTH", "WEST"];
const size = 5;

//Functions
// 1.Place the robot on the initial spot
const place = (x, y, dir) => {
  const inBounds = x >= 0 && x <= size && y >= 0 && y <= size;
  if (!inBounds || !directions.includes(dir)) {
    console.log("Invalid PLACE command");
    return null;
  }
  return [x, y, dir];
}

// 2.Move forward func
const move = (oldX, oldY, oldDir) => {
  if ((oldX === 5 && oldDir === "EAST") ||
      (oldX === 0 && oldDir === "WEST") ||
      (oldY === 5 && oldDir === "NORTH") ||
      (oldY === 0 && oldDir === "SOUTH")) {
    throw new Error("Move out of bounds!");
  }
  let newX = oldX;
  let newY = oldY;
  if (oldDir === "EAST") newX++;
  else if (oldDir === "WEST") newX--;
  else if (oldDir === "NORTH") newY++;
  else if (oldDir === "SOUTH") newY--;

  return [newX, newY, oldDir];
};

// 3.Turn left or right func
const turn = (command, oldDir) => {
  const index = directions.indexOf(oldDir);
  if (command === "LEFT")  return directions[(index + 3) % 4];
  if (command === "RIGHT") return directions[(index + 1) % 4];
  return newDir;
}

// Report func
function report(state) {
  console.log(`Output: ${state[0]},${state[1]},${state[2]}`);
}

// Readline & input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let state = null;

rl.on("line", (line) => {
  line = line.trim();

  if (line.startsWith("PLACE")) {
    const [, values] = line.split("PLACE");
    const [x, y, dir] = values.trim().split(",");
    state = place(parseInt(x), parseInt(y), dir);
  } else if (state && Array.isArray(state)) {
    const [x, y, dir] = state;
    if (line === "MOVE") state = move(x, y, dir);
    else if (line === "LEFT" || line === "RIGHT")
      state = [x, y, turn(line, dir)];
    else if (line === "REPORT") report(state);
  }
});


