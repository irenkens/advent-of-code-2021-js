import { getInput, splitOnLineBreak, printHeader } from './util';

const countZeros = (list, step) => {
  let zeros = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i][step] === '0') zeros++;
  }

  return zeros;
};

const part1 = list => {
  let gamma = '';
  let epsilon = '';

  for (let k = 0; k < list[0].length; k++) {
    const zeros = countZeros(list, k);
    const mostCommon = zeros > list.length / 2 ? 0 : 1;
    gamma += mostCommon;
    epsilon += 1 - mostCommon;
  }

  gamma = parseInt(gamma, 2);
  epsilon = parseInt(epsilon, 2);

  return gamma * epsilon;
};

const getRating = (list, step, type) => {
  if (list.length === 1) return list[0];
  const zeros = countZeros(list, step);
  const mostCommon = zeros <= list.length / 2 ? 1 : 0;
  const toKeep = type === 'oxygen' ? `${mostCommon}` : `${1 - mostCommon}`;
  const newList = list.filter(x => x.charAt(step) === toKeep);

  return getRating(newList, step + 1, type);
};

const part2 = list => {
  const oxygenRating = parseInt(getRating(list, 0, 'oxygen'), 2);
  const co2Rating = parseInt(getRating(list, 0, 'co2'), 2);

  return oxygenRating * co2Rating;
};

export const day3 = async () => {
  const input = await getInput(__filename);
  const list = splitOnLineBreak(input);

  printHeader(__filename, 1);
  console.log(part1(list));
  printHeader(__filename, 2);
  console.log(part2(list));
};
