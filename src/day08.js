import { difference, intersection } from 'lodash';
import { getInput, splitOnLineBreak, printHeader } from './util';

const part1 = notes => {
  const outputs = notes.map(entry => {
    return entry.split(' | ')[1].split(' ').filter(digit => [2, 4, 3, 7].includes(digit.length));
  });

  return outputs.reduce((sum, curr) => sum + curr.length, 0);
};

// returns true if pattern1 includes pattern2 and false otherwise
const includesPattern = (pattern1, pattern2) => {
  return intersection(pattern1.split(''), pattern2.split('')).length === pattern2.length;
};

const getMapping = patterns => {
  const result = {
    0: '',
    1: patterns.find(p => p.length === 2),
    2: '',
    3: '',
    4: patterns.find(p => p.length === 4),
    5: '',
    6: '',
    7: patterns.find(p => p.length === 3),
    8: patterns.find(p => p.length === 7),
    9: '',
  };

  // patterns for 0, 6 and 9 have length 6
  const zeroSixNine = patterns.filter(p => p.length === 6);
  // We can determine 9 as it's the only pattern that includes the pattern of 4
  result[9] = zeroSixNine.find(p => includesPattern(p, result[4]));
  // We can determine 6 as it's the only pattern not including the pattern of 1
  result[6] = zeroSixNine.find(p => !includesPattern(p, result[1]));
  // We can determine 0 as it's remaining
  result[0] = zeroSixNine.find(p => p !== result[9] && p !== result[6]);

  // patterns for 2, 3 and 5 have length 5
  const twoThreeFive = patterns.filter(p => p.length === 5);
  // We can determine 3 since it's the only pattern including the pattern of 1
  result[3] = twoThreeFive.find(p => includesPattern(p, result[1]));
  // We can determine 5 since it's the pattern of 6 but with one character less
  result[5] = twoThreeFive.find(p => difference(result[6].split(''), p.split('')).length === 1);
  // We can determine 2 as it's remaining
  result[2] = twoThreeFive.find(p => p !== result[3] && p !== result[5]);

  return result;
};

const getOutputValue = (output, mapping) => {
  let result = '';
  const keys = Object.keys(mapping);
  for (let i = 0; i < output.length; i++) {
    const digit = output[i];
    result += keys.find(key => mapping[key].length === digit.length && includesPattern(digit, mapping[key]));
  }

  return +result;
};

const part2 = notes => {
  const entries = notes.map(entry => entry.split(' | '));
  let totalValue = 0;
  for (let i = 0; i < entries.length; i++) {
    const [patterns, output] = entries[i];
    const mapping = getMapping(patterns.split(' '));
    totalValue += getOutputValue(output.split(' '), mapping);
  }
  return totalValue;
};

export const day8 = async () => {
  const input = await getInput(__filename);
  const notes = splitOnLineBreak(input);

  printHeader(__filename, 1);
  console.log(part1(notes));
  printHeader(__filename, 2);
  console.log(part2(notes));
};
