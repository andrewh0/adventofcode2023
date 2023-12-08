import { getLines } from "./helpers";

const example = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;
const exampleLines = example.split("\n");

const lines = getLines("inputs/day07.txt");

function parseInput(lines) {
  return lines.map((line) => {
    const [hand, strNumber] = line.split(" ");
    return [hand, parseInt(strNumber)];
  });
}

function countOccurrences(hand) {
  const result = {};
  for (let i = 0; i < hand.length; i++) {
    const card = hand[i];
    if (result[card]) {
      result[card] += 1;
    } else {
      result[card] = 1;
    }
  }
  return result;
}

function isFiveOfAKind(hand) {
  return new Set(hand.split("")).size === 1;
}

function isFourOfAKind(hand) {
  const occ = countOccurrences(hand);
  return (
    new Set(hand.split("")).size === 2 &&
    Object.values(occ).some((i) => i === 4)
  );
}
function isFullHouse(hand) {
  const occ = countOccurrences(hand);
  return (
    new Set(hand.split("")).size === 2 &&
    Object.values(occ).some((i) => i === 2) &&
    Object.values(occ).some((i) => i === 3)
  );
}

function isThreeOfAKind(hand) {
  const occ = countOccurrences(hand);
  return (
    new Set(hand.split("")).size === 3 &&
    Object.values(occ).some((i) => i === 3)
  );
}

function isTwoPair(hand) {
  const occ = countOccurrences(hand);
  return (
    new Set(hand.split("")).size === 3 &&
    Object.values(occ).some((i) => i === 1)
  );
}

function isOnePair(hand) {
  const occ = countOccurrences(hand);
  return (
    new Set(hand.split("")).size === 4 &&
    Object.values(occ).some((i) => i === 2)
  );
}

function isHighCard(_hand) {
  return true;
}

function getStrength(hand) {
  const checks = [
    isFiveOfAKind,
    isFourOfAKind,
    isFullHouse,
    isThreeOfAKind,
    isTwoPair,
    isOnePair,
    isHighCard,
  ];

  let i = 0;
  while (!checks[i](hand)) {
    i += 1;
  }

  return checks.length - i;
}

function tieBreak(hand1, hand2) {
  const cardStrengths = "AKQJT98765432"; // high to low
  const cardStrengthList = cardStrengths.split("").reverse();
  for (let i = 0; i < hand1.length; i++) {
    const hand1Card = hand1[i];
    const hand2Card = hand2[i];
    if (
      cardStrengthList.findIndex((v) => v === hand1Card) >
      cardStrengthList.findIndex((v) => v === hand2Card)
    ) {
      return 1;
    } else if (
      cardStrengthList.findIndex((v) => v === hand1Card) <
      cardStrengthList.findIndex((v) => v === hand2Card)
    ) {
      return -1;
    }
  }
  throw "could not tie break";
}

function compareStrengths(hand1, hand2) {
  if (getStrength(hand1) > getStrength(hand2)) {
    return 1;
  } else if (getStrength(hand1) < getStrength(hand2)) {
    return -1;
  } else {
    return tieBreak(hand1, hand2);
  }
}

function getTotalWinnings(handsAndBids) {
  return handsAndBids.reduce((sum, [_hand, bid], i) => sum + (i + 1) * bid, 0);
}

function part1(lines) {
  const handsAndBids = parseInput(lines);
  handsAndBids.sort((a, b) => {
    const [hand1] = a;
    const [hand2] = b;
    return compareStrengths(hand1, hand2);
  });
  return getTotalWinnings(handsAndBids);
}
