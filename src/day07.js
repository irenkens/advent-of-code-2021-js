import { getInput, printHeader } from './util';

const part1 = positions => {
  const lowest = Math.min(...positions);
  const highest = Math.max(...positions);
  let leastFuel = Infinity;

  for (let i = lowest; i <= highest; i++) {
    let fuel = 0;
    for (let k = 0; k < positions.length; k++) {
      fuel += Math.abs(positions[k] - i);
    }
    leastFuel = fuel < leastFuel ? fuel : leastFuel;
  }

  return leastFuel;
};

const part2 = positions => {
  const lowest = Math.min(...positions);
  const highest = Math.max(...positions);
  let leastFuel = Infinity;

  for (let i = lowest; i <= highest; i++) {
    let fuel = 0;
    for (let k = 0; k < positions.length; k++) {
      const diff = Math.abs(positions[k] - i);
      fuel += (diff * (diff + 1)) / 2;
    }
    leastFuel = fuel < leastFuel ? fuel : leastFuel;
  }

  return leastFuel;
};

export const day7 = async () => {
  const input = await getInput(__filename);
  const positions = input.split(',').map(line => +line);

  printHeader(__filename, 1);
  console.log(part1(positions));
  printHeader(__filename, 2);
  console.log(part2(positions));
};
