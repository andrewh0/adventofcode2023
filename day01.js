import { getLines } from "./helpers";

const lines = getLines("inputs/day01.txt");

const part1 = (lines) => {
  let sum = 0;
  lines.forEach((line) => {
    let firstNumber = null;
    let lastNumber = null;
    line.split("").forEach((char) => {
      if (!Number.isNaN(parseInt(char))) {
        const number = parseInt(char);
        if (firstNumber === null) {
          firstNumber = number;
        }
        lastNumber = number;
      }
    });
    const twoDigitNumber = parseInt(`${firstNumber}${lastNumber}`);
    sum += twoDigitNumber;
  });
  return sum;
};

const numbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const getFirstSpelledNumber = (line) => {
  const spelledNumbers = Object.keys(numbers);
  let minIndex = Infinity;
  let firstNumber = null;
  for (let spelledNumber of spelledNumbers) {
    let index = line.indexOf(spelledNumber);
    if (index < minIndex && index !== -1) {
      minIndex = index;
      firstNumber = numbers[spelledNumber];
    }
  }
  return [firstNumber, minIndex];
};

const getLastSpelledNumber = (line) => {
  const spelledNumbers = Object.keys(numbers);
  let maxIndex = -Infinity;
  let lastNumber = null;
  for (let spelledNumber of spelledNumbers) {
    let index = line.lastIndexOf(spelledNumber);
    if (index > maxIndex && index !== -1) {
      maxIndex = index;
      lastNumber = numbers[spelledNumber];
    }
  }
  return [lastNumber, maxIndex];
};

const getFirstNumber = (line) => {
  for (let i = 0; i < line.length; i++) {
    if (!Number.isNaN(parseInt(line[i]))) {
      return [parseInt(line[i]), i];
    }
  }
  return [null, Infinity];
};

const getLastNumber = (line) => {
  for (let i = line.length; i >= 0; i--) {
    if (!Number.isNaN(parseInt(line[i]))) {
      return [parseInt(line[i]), i];
    }
  }
  return [null, -Infinity];
};

const part2 = (lines) => {
  let sum = 0;
  lines.forEach((line) => {
    const [num1, i] = getFirstSpelledNumber(line);
    const [num2, j] = getFirstNumber(line);
    const firstNumber = j === null || i < j ? num1 : num2;

    const [num3, k] = getLastSpelledNumber(line);
    const [num4, l] = getLastNumber(line);
    const lastNumber = l === null || k > l ? num3 : num4;

    const twoDigitNumber = parseInt(`${firstNumber}${lastNumber}`);
    sum += twoDigitNumber;
  });
  return sum;
};
