import { getLines } from "./helpers";

const example = `Time:      7  15   30
Distance:  9  40  200`;
const exampleLines = example.split("\n");

const lines = getLines("inputs/day06.txt");

function parseInput(lines) {
  const times = lines[0]
    .split(":")[1]
    .trim()
    .split(/\s+/)
    .map((s) => parseInt(s));
  const distances = lines[1]
    .split(":")[1]
    .trim()
    .split(/\s+/)
    .map((s) => parseInt(s));

  return times.map((time, i) => [time, distances[i]]);
}

function countWays(time, distanceRecord) {
  const distancesTravelled = [];
  for (let i = 1; i < time; i++) {
    const distance = getDistanceTravelled(i, time);
    if (distance > distanceRecord) {
      distancesTravelled.push(distance);
    }
  }
  return distancesTravelled.length;
}

function getDistanceTravelled(msHeld, totalTime) {
  const speed = msHeld;
  const timeRemaining = totalTime - msHeld;
  return timeRemaining * speed;
}

function part1(lines) {
  const races = parseInput(lines);
  const ways = [];
  for (let [time, distanceRecord] of races) {
    ways.push(countWays(time, distanceRecord));
  }

  return ways.reduce((acc, curr) => acc * curr, 1);
}
