import { getLines } from "./helpers";

const grid = getLines("inputs/day03.txt");

const example = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
const exampleGrid = example.split("\n");

function isDigit(char) {
  return !Number.isNaN(parseInt(char));
}

function isSymbol(char) {
  return !isDigit(char) && char !== ".";
}

function isNextToSymbol(r, c, grid) {
  const adjacentCells = [
    [r - 1, c - 1],
    [r - 1, c],
    [r - 1, c + 1],
    [r, c - 1],
    [r, c + 1],
    [r + 1, c - 1],
    [r + 1, c],
    [r + 1, c + 1],
  ];
  for (let i = 0; i < adjacentCells.length; i++) {
    const [row, col] = adjacentCells[i];
    if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
      if (isSymbol(grid[row][col])) {
        return true;
      }
    }
  }
  return false;
}

function part1(grid) {
  const numbers = [];
  for (let i = 0; i < grid.length; i++) {
    let currNumber = "";
    let isCurrNumberAdjacent = false;
    for (let j = 0; j < grid[0].length; j++) {
      const char = grid[i][j];
      if (isDigit(char)) {
        currNumber += char;
        if (isNextToSymbol(i, j, grid)) {
          isCurrNumberAdjacent = true;
        }
      } else {
        if (currNumber) {
          if (isCurrNumberAdjacent) {
            numbers.push(currNumber);
          }
          currNumber = "";
          isCurrNumberAdjacent = false;
        }
      }
    }
    // Don't forget to push to number list after each row
    if (currNumber) {
      if (isCurrNumberAdjacent) {
        numbers.push(currNumber);
      }
      currNumber = "";
      isCurrNumberAdjacent = false;
    }
  }

  return numbers
    .map((numberStr) => parseInt(numberStr))
    .reduce((total, curr) => total + curr, 0);
}

// console.log(part1(lines));

function isGear(char) {
  return char === "*";
}

function getFullNumber(r, c, grid) {
  let result = "";
  let i = c;
  while (i >= 0 && isDigit(grid[r][i])) {
    i--;
  }
  i += 1;
  let visited = [];
  while (isDigit(grid[r][i])) {
    result += grid[r][i];
    visited.push(`${r},${i}`);
    i++;
  }
  return [parseInt(result), visited];
}

function getSurroundingNumbers(r, c, grid) {
  const result = [];
  let alreadyVisited = new Set([]);
  const adjacentCells = [
    [r - 1, c - 1],
    [r - 1, c],
    [r - 1, c + 1],
    [r, c - 1],
    [r, c + 1],
    [r + 1, c - 1],
    [r + 1, c],
    [r + 1, c + 1],
  ];
  for (let i = 0; i < adjacentCells.length; i++) {
    const [row, col] = adjacentCells[i];
    if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
      if (isDigit(grid[row][col]) && !alreadyVisited.has(`${row},${col}`)) {
        const [number, visited] = getFullNumber(row, col, grid);
        visited.forEach((coordinate) => alreadyVisited.add(coordinate));
        result.push(number);
      }
    }
  }
  return result;
}

function part2(grid) {
  let products = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const cell = grid[i][j];
      if (isGear(cell)) {
        let surroundingNumbers = getSurroundingNumbers(i, j, grid);
        if (surroundingNumbers.length === 2) {
          products.push(surroundingNumbers[0] * surroundingNumbers[1]);
        }
      }
    }
  }
  return products.reduce((total, product) => total + product, 0);
}
