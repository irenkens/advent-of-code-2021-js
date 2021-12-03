import { getInput, splitOnLineBreak, printHeader } from './util';

const part1 = instructions => {
  let horizontal = 0;
  let depth = 0;

  for (let i = 0; i < instructions.length; i++) {
    const [cmd, value] = instructions[i].split(' ');

    if (cmd === 'forward') {
      horizontal += +value;
    } else if (cmd === 'up') {
      depth -= +value;
    } else if (cmd === 'down') {
      depth += +value;
    }
  }

  return horizontal * depth;
};

const part2 = instructions => {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  for (let i = 0; i < instructions.length; i++) {
    const [cmd, value] = instructions[i].split(' ');

    if (cmd === 'forward') {
      horizontal += +value;
      depth += aim * +value;
    } else if (cmd === 'up') {
      aim -= +value;
    } else if (cmd === 'down') {
      aim += +value;
    }
  }

  return horizontal * depth;
};

export const day2 = async () => {
  const input = await getInput(__filename);
  const numbers = splitOnLineBreak(input);

  printHeader(__filename, 1);
  console.log(part1(numbers));
  printHeader(__filename, 2);
  console.log(part2(numbers));
};
