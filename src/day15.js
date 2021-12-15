// eslint-disable-next-line
import { find_path } from 'dijkstrajs';
import { getInput, splitOnLineBreak, printHeader } from './util';

const getNeighbours = (x, y, grid) => {
  const neighbours = {};
  const up = grid[y - 1]?.[x];
  const down = grid[y + 1]?.[x];
  const left = grid[y]?.[x - 1];
  const right = grid[y]?.[x + 1];

  if (up) {
    neighbours[`${x},${y - 1}`] = +up;
  }

  if (down) {
    neighbours[`${x},${y + 1}`] = +down;
  }

  if (left) {
    neighbours[`${x - 1},${y}`] = +left;
  }

  if (right) {
    neighbours[`${x + 1},${y}`] = +right;
  }
  return neighbours;
};

const getRisk = grid => {
  const size = grid.length;
  const graph = {};

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const point = `${x},${y}`;
      graph[point] = getNeighbours(x, y, grid);
    }
  }
  const start = '0,0';
  const end = `${size - 1},${size - 1}`;
  const path = find_path(graph, start, end);

  let totalRisk = 0;
  for (let i = 0; i < path.length; i++) {
    const split = path[i].split(',');
    const x = +split[0];
    const y = +split[1];
    totalRisk += +grid[y][x];
  }

  const startValue = +grid[0][0];
  return totalRisk - startValue;
};

const part1 = grid => {
  return getRisk(grid);
};

const getLargeGrid = grid => {
  const originalSize = grid.length;
  const size = originalSize * 5;
  const bigGrid = [];
  for (let y = 0; y < size; y++) {
    if (!bigGrid[y]) bigGrid[y] = new Array(size);

    for (let x = 0; x < size; x++) {
      if (x < originalSize && y < originalSize) {
        bigGrid[y][x] = +grid[y][x];
        continue;
      }

      if (x >= originalSize) {
        const smaller = bigGrid[y][x - originalSize];
        const value = smaller === 9 ? 1 : smaller + 1;
        bigGrid[y][x] = value;
        continue;
      }

      if (y >= originalSize) {
        const smaller = bigGrid[y - originalSize][x];
        const value = smaller === 9 ? 1 : smaller + 1;
        bigGrid[y][x] = value;
        continue;
      }
    }
  }
  return bigGrid;
};

const part2 = grid => {
  const largeGrid = getLargeGrid(grid);
  return getRisk(largeGrid);
};

export const day15 = async () => {
  const input = await getInput(__filename);
  const grid = splitOnLineBreak(input);

  printHeader(__filename, 1);
  console.log(part1(grid));
  printHeader(__filename, 2);
  console.log(part2(grid));
};
