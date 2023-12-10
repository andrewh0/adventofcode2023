import { getLines } from "./helpers";

const example = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;
const exampleLines = example.split("\n");

const lines = getLines("inputs/day10.txt");

const up = ["F", "7", "|", "S"];
const down = ["L", "J", "|", "S"];
const left = ["L", "F", "-", "S"];
const right = ["J", "7", "-", "S"];

const possibleConnections = {
  "|": {
    up,
    down,
    left: [],
    right: [],
  },
  "-": {
    up: [],
    down: [],
    left,
    right,
  },
  L: {
    up,
    down: [],
    left: [],
    right,
  },
  J: {
    up,
    down: [],
    left,
    right: [],
  },
  7: {
    up: [],
    down,
    left,
    right: [],
  },
  F: {
    up: [],
    down,
    left: [],
    right,
  },
  S: {
    up,
    down,
    left,
    right,
  },
  ".": {
    up: [],
    down: [],
    left: [],
    right: [],
  },
};

function isConnected(tile1, tile2, dir) {
  return possibleConnections[tile1][dir].includes(tile2);
}

function getTile(point, grid) {
  const [r, c] = point;
  return grid[r][c];
}

function getNextPoint(point, visited, grid) {
  const [r, c] = point;
  let adjacents = [
    [r + 1, c], // down
    [r - 1, c], // up
    [r, c - 1], // left
    [r, c + 1], // right
  ];
  const dirs = ["down", "up", "left", "right"];

  for (let a = 0; a < adjacents.length; a++) {
    let [i, j] = adjacents[a];
    if (visited.has(`${i},${j}`)) {
      continue;
    }
    if (i >= 0 && i < grid.length && j >= 0 && j < grid[0].length) {
      const tile1 = getTile(point, grid);
      const tile2 = getTile([i, j], grid);
      const dir = dirs[a];
      if (isConnected(tile1, tile2, dir)) {
        return [i, j];
      }
    }
  }
  return null;
}

function getStart(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "S") {
        return [i, j];
      }
    }
  }
  throw "no start";
}

function followPath(start, grid) {
  const visited = new Set(`${start[0]},${start[1]}`);
  const path = [start];
  let currPoint = start;

  visited.add(`${start[0]},${start[1]}`);
  currPoint = getNextPoint(currPoint, visited, grid);
  path.push(currPoint);
  visited.add(`${currPoint[0]},${currPoint[1]}`);

  while (true) {
    currPoint = getNextPoint(currPoint, visited, grid);
    if (currPoint === null) break;
    visited.add(`${currPoint[0]},${currPoint[1]}`);
    path.push(currPoint);
  }
  return path;
}

function part1(grid) {
  const start = getStart(grid);
  const path = followPath(start, grid);
  return path.length / 2;
}
