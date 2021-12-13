import { getInput, splitOnEmptyLine, splitOnLineBreak, printHeader } from './util';

const foldY = (coordinates, line) => {
  const newCoordinates = [];
  for (let i = 0; i < coordinates.length; i++) {
    const coordinate = coordinates[i].split(',');
    const x = +coordinate[0];
    const y = +coordinate[1];

    if (y < line) {
      newCoordinates.push(coordinates[i]);
      continue;
    }

    const newY = line * 2 - y;
    newCoordinates.push(`${x},${newY}`);
  }

  return [...new Set(newCoordinates)];
};

const foldX = (coordinates, line) => {
  const newCoordinates = [];
  for (let i = 0; i < coordinates.length; i++) {
    const coordinate = coordinates[i].split(',');
    const x = +coordinate[0];
    const y = +coordinate[1];

    if (x < line) {
      newCoordinates.push(coordinates[i]);
      continue;
    }

    const newX = line * 2 - x;
    newCoordinates.push(`${newX},${y}`);
  }

  return [...new Set(newCoordinates)];
};

const part1 = (coordinates, instructions) => {
  const [direction, line] = instructions[0].replace('fold along ', '').split('=');
  const newCoordinates = direction === 'y' ? foldY(coordinates, line) : foldX(coordinates, line);
  return newCoordinates.length;
};

const printCode = coordinates => {
  const mapped = coordinates.map(coordinate => {
    const split = coordinate.split(',');
    return [+split[0], +split[1]];
  });

  const biggestX = Math.max(...mapped.map(c => c[0]));
  const biggestY = Math.max(...mapped.map(c => c[1]));
  const grid = [];

  for (let i = 0; i < biggestY + 1; i++) {
    grid[i] = new Array(biggestX + 1).fill('.');
  }

  for (let i = 0; i < mapped.length; i++) {
    const [x, y] = mapped[i];
    grid[y][x] = '#';
  }

  console.log(grid.map(r => r.join('')).join('\n'));
};

const part2 = (coordinates, instructions) => {
  let newCoordinates = [...coordinates];
  for (let i = 0; i < instructions.length; i++) {
    const [direction, line] = instructions[i].replace('fold along ', '').split('=');
    newCoordinates = direction === 'y' ? foldY(newCoordinates, line) : foldX(newCoordinates, line);
  }

  printCode(newCoordinates);
};

export const day13 = async () => {
  const input = await getInput(__filename);
  const split = splitOnEmptyLine(input);
  const coordinates = splitOnLineBreak(split[0]);
  const instructions = splitOnLineBreak(split[1]);

  printHeader(__filename, 1);
  console.log(part1(coordinates, instructions));
  printHeader(__filename, 2);
  part2(coordinates, instructions);
};
