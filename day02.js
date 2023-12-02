import { getLines } from "./helpers";

const lines = getLines("inputs/day02.txt");

const example = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
const exampleLines = example.split("\n");

const getParsedGameId = (line) => parseInt(line.split(":")[0].split(" ")[1]);
const getParsedSets = (line) =>
  line
    .split(":")[1]
    .trim()
    .split(";")
    .map((s) => s.trim())
    .map(parseSetStr);

const parseSetStr = (setStr) => {
  const totalCounts = {
    red: 0,
    green: 0,
    blue: 0,
  };
  const colorCounts = setStr
    .split(",")
    .map((colorCountStr) => colorCountStr.trim().split(" "));

  return colorCounts.reduce((acc, [numStr, color]) => {
    const num = parseInt(numStr);
    acc[color] += num;
    return acc;
  }, totalCounts);
};

const getGameList = (lines) =>
  lines.map((line) => ({
    gameId: getParsedGameId(line),
    sets: getParsedSets(line),
  }));

const colorTotals = {
  red: 12,
  green: 13,
  blue: 14,
};

const isPossible = (game, colorTotals) => {
  const { red: redTotal, green: greenTotal, blue: blueTotal } = colorTotals;
  for (let i = 0; i < game.sets.length; i++) {
    const { red, green, blue } = game.sets[i];
    if (red > redTotal || green > greenTotal || blue > blueTotal) {
      return false;
    }
  }
  return true;
};

const getGameIdSum = (games) =>
  games.reduce((total, game) => (total += game.gameId), 0);

const part1 = (lines) => {
  const games = getGameList(lines);
  const possibleGames = games.filter((game) => isPossible(game, colorTotals));
  return getGameIdSum(possibleGames);
};

const getMaxColorCounts = (sets) => {
  const totalCounts = {
    red: 0,
    green: 0,
    blue: 0,
  };
  for (let i = 0; i < sets.length; i++) {
    const { red, green, blue } = sets[i];
    if (red && red > totalCounts.red) {
      totalCounts["red"] = red;
    }
    if (green && green > totalCounts.green) {
      totalCounts["green"] = green;
    }
    if (blue && blue > totalCounts.blue) {
      totalCounts["blue"] = blue;
    }
  }
  return totalCounts;
};

const getColorProduct = (totalCounts) =>
  totalCounts.red * totalCounts.blue * totalCounts.green;

const part2 = (lines) => {
  const games = getGameList(lines);
  return games.reduce(
    (sum, game) => sum + getColorProduct(getMaxColorCounts(game.sets)),
    0
  );
};
