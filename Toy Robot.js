// Functions: 
// 1.Place the robot on the initial spot
// 2.Move forward
// 3.Turn left or right
// 4.Report the current position of the robot in X,Y,F format
// 5.robot to fall

let directions = ["NORTH", "EAST", "SOUTH", "WEST"]
const size = 5
// const i = Math.floor(Math.random() * directions.length);
// let direction = directions[i]

const grid = (x, y) => {
  const length = x * y;
  const myArray = new Array(length);
  console.log(myArray.length);

  return myArray
}

// testing grid
grid(1, 2)
grid(5, 5)
grid(3, 5)

const place = (x, y, f) => {
  const inBounds = x >= 0 && x < size && y >= 0 && y <size;

  if (inBounds && directions.includes(f)) {
    return [x, y, f];
  } else if (!inBounds && directions.includes(f)) {
    return "Your robot is falling";
  } else if (inBounds && !directions.includes(f)) {
    return "Your direction is wrong";
  } else {
    return "Something wrong with the position and direction";
  }
};

// testing place
console.log(place(2, 3, "NORTH"))

//MOVE

const move = (x0, y0, f0) => {
  let x1 = x0, y1 = y0;

  if (f0 === "EAST") {
    x1 = x0 + 1, y1 = y0
  } else if (f0 === "WEST" && x0 >= 1) {
    x1 = x0 - 1, y1 = y0
  } else if (f0 === "NORTH") {
    y1 = y0 + 1, x1 = x0
  } else if (f0 === "SOUTH" && y0 >= 1) {
    y1 = y0 - 1, x1 = x0
  } else { return "You can't move forward on this direction" }

  return [x1, y1, f0];
}

const initRobot = place(0, 1, "EAST");

if (Array.isArray(initRobot)) {
  const [x0, y0, f0] = initRobot;
  console.log(move(x0, y0, f0));
} else {
  console.log(initRobot)
}


//LEFT & RIGHT
if (Array.isArray(initRobot)) {
  let f0 = initRobot[2]
  console.log(f0)
} else {
  console.log(initRobot)
}

// LEFT

const left = (f0) => {
  if (!directions.includes(f0)) {
    console.log(initRobot)
  } else {
    const idx = directions.indexOf(f0);
    const next = (idx - 1 + directions.length) % directions.length; // 环形索引(摸取)
    return directions[next];
  }
};

//RIGHT

const right = (f0) => {
  if (!directions.includes(f0)) return null;
  const idx = directions.indexOf(f0);
  const next = (idx + 1) % directions.length;
  return directions[next];
};

// report
const report = (x, y, f) => {
  const output = `${x},${y},${f}`;
  console.log(output);
  return output;
};

let robot = place(0, 0, "NORTH");

if (Array.isArray(robot)) {
  let [x, y, f] = robot;


  [x, y, f] = move(x, y, f);


  f = left(f);


  report(x, y, f); 
} else {
  console.log(robot);
}
