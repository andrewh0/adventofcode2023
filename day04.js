import { getLines } from "./helpers";

const lines = getLines("inputs/day04.txt");

const example = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;
const exampleLines = example.split("\n");

function parseRow(rowStr) {
  const cardNumber = parseInt(rowStr.split(":")[0].split(/\s+/)[1]);
  const winningNumbers = rowStr
    .split(":")[1]
    .split("|")[0]
    .trim()
    .split(" ")
    .map((s) => parseInt(s));
  const myNumbers = rowStr
    .split(":")[1]
    .split("|")[1]
    .trim()
    .split(/\s+/)
    .map((s) => parseInt(s));
  return {
    cardNumber,
    winningNumbers: new Set(winningNumbers),
    myNumbers: new Set(myNumbers),
  };
}

function getIntersection(set1, set2) {
  const result = [];
  for (let i of set1) {
    if (set2.has(i)) {
      result.push(i);
    }
  }
  return result;
}

function getCardValues(parsedRow) {
  const intersection = getIntersection(
    parsedRow.winningNumbers,
    parsedRow.myNumbers
  );
  let score = 0;
  if (intersection.length === 0) {
    return score;
  }
  return Math.pow(2, intersection.length - 1);
}

function part1(lines) {
  const parsedRows = lines.map(parseRow);
  const cardValues = parsedRows.map(getCardValues);
  return cardValues.reduce((total, value) => total + value, 0);
}

function setUpCardCounts(lines) {
  const result = {};
  lines.map(parseRow).forEach((parsedRow) => {
    result[parsedRow.cardNumber] = 1;
  });
  return result;
}

function part2(lines) {
  const cardCounts = setUpCardCounts(lines);
  const parsedRows = lines.map(parseRow);
  for (let i = 0; i < parsedRows.length; i++) {
    const { cardNumber, winningNumbers, myNumbers } = parsedRows[i];
    const winCount = getIntersection(winningNumbers, myNumbers).length;
    for (let j = 1; j <= winCount; j++) {
      cardCounts[cardNumber + j] += cardCounts[cardNumber];
    }
  }
  return Object.values(cardCounts).reduce((total, count) => total + count, 0);
}
