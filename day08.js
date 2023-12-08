import { getLines } from "./helpers";

const example = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;
const exampleLines = example.split("\n");

const lines = getLines("inputs/day08.txt");

function getAdjList(lines) {
  const result = {};
  lines.forEach((line) => {
    const [node, adjacentNodesStr] = line.split(" = ");
    const [left, right] = adjacentNodesStr.replace(/[\(\)]/g, "").split(", ");
    result[node] = [left, right];
  });

  return result;
}

function getInstructions(lines) {
  return lines[0];
}

function getGraphLines(lines) {
  return lines.slice(2);
}

function getCount(adjList, instructions) {
  let currNode = "AAA";
  let i = 0;
  let count = 0;

  while (currNode !== "ZZZ") {
    if (i >= instructions.length) {
      i = 0;
    }
    const dir = instructions[i];
    currNode = adjList[currNode][dir === "L" ? 0 : 1];
    i += 1;
    count += 1;
  }
  return count;
}

function part1(lines) {
  return getCount(getAdjList(getGraphLines(lines)), getInstructions(lines));
}

console.log(part1(lines));
