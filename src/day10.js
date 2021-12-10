import { getInput, splitOnLineBreak, printHeader } from './util';

const OPEN = ['(', '[', '{', '<'];
const CLOSE = [')', ']', '}', '>'];

const isPair = (open, close) => {
  if (open === '(' && close === ')') return true;
  if (open === '[' && close === ']') return true;
  if (open === '{' && close === '}') return true;
  if (open === '<' && close === '>') return true;
  return false;
};

const pointTable1 = Object.freeze({
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
});

const part1 = lines => {
  let score = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const stack = [line.charAt(0)];

    for (let j = 1; j < line.length; j++) {
      const bracket = line.charAt(j);
      if (OPEN.includes(bracket)) {
        stack.push(bracket);
        continue;
      }

      if (CLOSE.includes(bracket)) {
        const open = stack[stack.length - 1];
        if (isPair(open, bracket)) {
          stack.pop();
          continue;
        }

        // Corrupt line
        score += pointTable1[bracket];
        break;
      }
    }
  }

  return score;
};

const closingBracket = Object.freeze({
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
});

const getClosingSequence = stack => {
  let sequence = '';
  for (let i = stack.length - 1; i >= 0; i--) {
    sequence += closingBracket[stack[i]];
  }
  return sequence;
};

const pointTable2 = Object.freeze({
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
});

const getScore = sequence => {
  let score = 0;
  for (let i = 0; i < sequence.length; i++) {
    score *= 5;
    score += pointTable2[sequence.charAt(i)];
  }
  return score;
};

const part2 = lines => {
  const scores = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const stack = [line.charAt(0)];
    let isCorrupt = false;

    for (let j = 1; j < line.length; j++) {
      const bracket = line.charAt(j);
      if (OPEN.includes(bracket)) {
        stack.push(bracket);
        continue;
      }

      if (CLOSE.includes(bracket)) {
        const open = stack[stack.length - 1];
        if (isPair(open, bracket)) {
          stack.pop();
          continue;
        }

        isCorrupt = true;
        break;
      }
    }

    if (!isCorrupt) {
      scores.push(getScore(getClosingSequence(stack)));
    }
  }

  scores.sort((a, b) => a - b);
  const middle = Math.floor(scores.length / 2);
  return scores[middle];
};

export const day10 = async () => {
  const input = await getInput(__filename);
  const lines = splitOnLineBreak(input);

  printHeader(__filename, 1);
  console.log(part1(lines));
  printHeader(__filename, 2);
  console.log(part2(lines));
};
