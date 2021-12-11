/* eslint-disable no-param-reassign */
import { getInput, splitOnLineBreak, printHeader } from './util';

const GRID_SIZE = 10;

// update surrounding energy levels of (c, r) by 1
const updateSurrounding = (c, r, levels) => {
  for (let i = c - 1; i < c + 2; i++) {
    for (let j = r - 1; j < r + 2; j++) {
      if (i === c && j === r) continue;
      if (levels[i]?.[j]) {
        levels[i][j] += 1;
      }
    }
  }
};

const doStep = levels => {
  // update all energy levels by 1
  const updatedLevels = levels.map(row => row.map(level => level + 1));

  // keep looping while there are octopuses that flash
  while (updatedLevels.flat().filter(x => x > 9).length > 0) {
    for (let c = 0; c < GRID_SIZE; c++) {
      for (let r = 0; r < GRID_SIZE; r++) {
        const level = updatedLevels[c][r];
        if (level > 9) {
          updateSurrounding(c, r, updatedLevels);
          updatedLevels[c][r] = 0;
        }
      }
    }
  }

  return updatedLevels;
};

const part1 = levels => {
  let totalFlashes = 0;
  for (let i = 0; i < 100; i++) {
    levels = doStep(levels);
    totalFlashes += levels.flat().filter(f => f === 0).length;
  }

  return totalFlashes;
};

const part2 = levels => {
  let step = 1;
  for (; step < Number.MAX_VALUE; step++) {
    levels = doStep(levels);
    if (levels.flat().filter(f => f === 0).length === GRID_SIZE * GRID_SIZE) {
      break;
    }
  }

  return step;
};

export const day11 = async () => {
  const input = await getInput(__filename);
  const levels = splitOnLineBreak(input).map(line => line.split('').map(n => +n));

  printHeader(__filename, 1);
  console.log(part1(levels));
  printHeader(__filename, 2);
  console.log(part2(levels));
};
