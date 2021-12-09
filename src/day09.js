import { getInput, splitOnLineBreak, printHeader } from './util';

const isLowPoint = (x, y, numbers, height, width) => {
  const point = numbers[y][x];
  const up = y - 1 < 0 ? 9 : numbers[y - 1][x];
  const down = y + 1 >= height ? 9 : numbers[y + 1][x];
  const left = x - 1 < 0 ? 9 : numbers[y][x - 1];
  const right = x + 1 >= width ? 9 : numbers[y][x + 1];

  return point < up && point < down && point < left && point < right;
};

const part1 = numbers => {
  const width = numbers[0].length;
  const height = numbers.length;
  let sum = 0;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (isLowPoint(x, y, numbers, height, width)) {
        sum += numbers[y][x] + 1;
      }
    }
  }

  return sum;
};

const getBasin = (x, y, numbers, width, height) => {
  const point = numbers[y][x];
  if (point === 9) return [];

  let basin = [`${x}${y}`];
  const up = y - 1 < 0 ? -1 : numbers[y - 1][x];
  const down = y + 1 >= height ? -1 : numbers[y + 1][x];
  const left = x - 1 < 0 ? -1 : numbers[y][x - 1];
  const right = x + 1 >= width ? -1 : numbers[y][x + 1];

  if (up > point) {
    basin = basin.concat(getBasin(x, y - 1, numbers, width, height));
  }

  if (down > point) {
    basin = basin.concat(getBasin(x, y + 1, numbers, width, height));
  }

  if (left > point) {
    basin = basin.concat(getBasin(x - 1, y, numbers, width, height));
  }

  if (right > point) {
    basin = basin.concat(getBasin(x + 1, y, numbers, width, height));
  }

  return [...new Set(basin)];
};

const part2 = numbers => {
  const width = numbers[0].length;
  const height = numbers.length;
  const basinSizes = [];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (isLowPoint(x, y, numbers, height, width)) {
        basinSizes.push(getBasin(x, y, numbers, width, height).length);
      }
    }
  }

  return basinSizes.sort((a, b) => b - a).slice(0, 3).reduce((result, size) => result * size, 1);
};

export const day9 = async () => {
  const input = await getInput(__filename);
  const numbers = splitOnLineBreak(input).map(line => line.split('').map(n => +n));

  printHeader(__filename, 1);
  console.log(part1(numbers));
  printHeader(__filename, 2);
  console.log(part2(numbers));
};
