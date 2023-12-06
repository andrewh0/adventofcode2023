import { getFileContents } from "./helpers";

const inputStr = getFileContents("inputs/day05.txt");
const example = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

function parseSeeds(seedStr) {
  return seedStr
    .split(":")[1]
    .trim()
    .split(" ")
    .map((s) => parseInt(s));
}

function parseMapping(mappingStrs) {
  const [_title, ...lines] = mappingStrs.split("\n");
  return lines.map((line) => {
    const [destStart, srcStart, rangeLength] = line
      .split(" ")
      .map((s) => parseInt(s));
    return {
      destStart,
      srcStart,
      rangeLength,
    };
  });
}

function followMapping(srcNumber, mapping) {
  for (let { destStart, srcStart, rangeLength } of mapping) {
    const srcEnd = srcStart + rangeLength;
    if (srcNumber >= srcStart && srcNumber < srcEnd) {
      const diff = srcNumber - srcStart;
      return destStart + diff;
    }
  }
  return srcNumber;
}

function parseLines(str, byPairs = false) {
  const [seedStr, ...mappingStrs] = str.split("\n\n");
  const mappings = mappingStrs.map(parseMapping);
  const seeds = byPairs ? parseSeedsPairs(seedStr) : parseSeeds(seedStr);
  return {
    seeds,
    mappings,
  };
}

function followAllMappings(srcNumber, mappings) {
  let result = srcNumber;
  mappings.forEach((mapping) => {
    result = followMapping(result, mapping);
  });
  return result;
}

function getMin(list) {
  return list.reduce((min, curr) => (curr < min ? curr : min), Infinity);
}

function part1(str) {
  const { seeds, mappings } = parseLines(str);
  const mappedSeeds = seeds.map((seed) => followAllMappings(seed, mappings));
  return getMin(mappedSeeds);
}

function parseSeedsPairs(seedStr) {
  const numbers = seedStr
    .split(":")[1]
    .trim()
    .split(" ")
    .map((s) => parseInt(s));
  let pairs = [];
  let pair = [];
  for (let i = 0; i < numbers.length; i++) {
    if (i % 2 === 1) {
      pair.push(numbers[i]);
      pairs.push(pair);
      pair = [];
    } else {
      pair.push(numbers[i]);
    }
  }
  return pairs;
}

// Adapted from https://www.youtube.com/watch?v=iqTopXV13LE
function followRanges(seedRanges, mapping) {
  let result = [];
  let ranges = seedRanges;
  for (let { destStart, srcStart, rangeLength } of mapping) {
    const srcEnd = srcStart + rangeLength;
    let nextRanges = [];
    while (ranges.length > 0) {
      const [seedStart, seedEnd] = ranges.pop();
      const startRange = [seedStart, Math.min(seedEnd, srcStart)];
      const middleRange = [
        Math.max(seedStart, srcStart),
        Math.min(srcEnd, seedEnd),
      ];
      const endRange = [Math.max(srcEnd, seedStart), seedEnd];

      if (startRange[1] > startRange[0]) {
        nextRanges.push(startRange);
      }
      if (middleRange[1] > middleRange[0]) {
        result.push([
          middleRange[0] - srcStart + destStart,
          middleRange[1] - srcStart + destStart,
        ]);
      }
      if (endRange[1] > endRange[0]) {
        nextRanges.push(endRange);
      }
    }
    ranges = nextRanges;
  }
  return result.concat(ranges);
}

// Takes too long.
function part2BruteForce(str) {
  const { seeds: seedPairs, mappings } = parseLines(str, true);
  let min = Infinity;
  for (let [seedStart, seedRange] of seedPairs) {
    for (let i = seedStart; i < seedStart + seedRange; i++) {
      const result = followAllMappings(i, mappings);
      min = Math.min(result, min);
    }
  }
  return min;
}

function part2(str) {
  let result = [];
  const { seeds: seedPairs, mappings } = parseLines(str, true);
  const seedRanges = seedPairs.map(([start, range]) => [start, start + range]);
  for (let seedRange of seedRanges) {
    let ranges = [seedRange];
    for (let mapping of mappings) {
      ranges = followRanges(ranges, mapping);
    }
    ranges.sort((a, b) => a[0] - b[0]);
    result.push(ranges[0][0]);
  }
  return result.reduce((min, curr) => Math.min(min, curr), Infinity);
}
