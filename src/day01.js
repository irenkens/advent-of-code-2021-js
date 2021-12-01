import { getInput, splitOnLineBreak, printHeader } from './util';

const part1 = numbers => {
  let increased = 0;
  for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i + 1] > numbers[i]) increased++;
  }
  return increased;
};

const part2 = numbers => {
  let increased = 0;
  for (let i = 0; i < numbers.length - 3; i++) {
    const group1 = numbers[i] + numbers[i + 1] + numbers[i + 2];
    const group2 = numbers[i + 1] + numbers[i + 2] + numbers[i + 3];
    if (group2 > group1) increased++;
  }
  return increased;
};

export const day1 = async () => {
  const input = await getInput(__filename);
  const numbers = splitOnLineBreak(input).map(line => +line);

  printHeader(__filename, 1);
  console.log(part1(numbers));
  printHeader(__filename, 2);
  console.log(part2(numbers));
};
