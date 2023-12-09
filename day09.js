import { getLines } from "./helpers";

const example = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;
const exampleLines = example.split("\n");

const lines = getLines("inputs/day09.txt");

function parseLine(line) {
  return line.split(" ").map((s) => parseInt(s));
}

function isAllZeroes(sequence) {
  return new Set(sequence).size === 1 && sequence[0] === 0;
}

function getNextSequence(sequence) {
  const result = [];
  for (let i = 1; i < sequence.length; i++) {
    let first = sequence[i - 1];
    let second = sequence[i];
    result.push(second - first);
  }
  return result;
}

function getSequences(sequence) {
  let result = [sequence];
  while (!isAllZeroes(result[result.length - 1])) {
    result.push(getNextSequence(result[result.length - 1]));
  }
  return result;
}

function predictNextNumber(sequences) {
  let lastNums = [];
  const nextNums = [0];
  for (let i = sequences.length - 2; i >= 0; i--) {
    lastNums.push(sequences[i][sequences[i].length - 1]);
  }

  for (let i = 0; i < lastNums.length; i++) {
    nextNums.push(lastNums[i] + nextNums[i]);
  }

  return nextNums[nextNums.length - 1];
}

function part1(lines) {
  const parsedLines = lines.map(parseLine);
  const numbers = parsedLines.map((line) => {
    const sequences = getSequences(line);
    return predictNextNumber(sequences);
  });
  return numbers.reduce((total, curr) => total + curr, 0);
}

function predictPrevNumber(sequences) {
  let firstNums = [];
  const nextNums = [0];
  for (let i = sequences.length - 2; i >= 0; i--) {
    firstNums.push(sequences[i][0]);
  }

  for (let i = 0; i < firstNums.length; i++) {
    nextNums.push(firstNums[i] - nextNums[i]);
  }
  return nextNums[nextNums.length - 1];
}

function part2(lines) {
  const parsedLines = lines.map(parseLine);
  const numbers = parsedLines.map((line) => {
    const sequences = getSequences(line);
    return predictPrevNumber(sequences);
  });
  return numbers.reduce((total, curr) => total + curr, 0);
}
