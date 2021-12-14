import { getInput, splitOnEmptyLine, splitOnLineBreak, printHeader } from './util';

const insert = (polymer, map) => {
  const newPolymer = new Array(polymer.length * 2 - 1);
  for (let i = 0; i < polymer.length; i++) {
    newPolymer[i * 2] = polymer[i];
  }

  for (let i = 1; i < newPolymer.length; i += 2) {
    const pair = `${newPolymer[i - 1]}${newPolymer[i + 1]}`;
    const element = map.get(pair);
    newPolymer[i] = element;
  }

  return newPolymer;
};

const getOccurrences = polymer => {
  const occurrences = {};
  for (let i = 0; i < polymer.length; i++) {
    const element = polymer[i];
    const key = occurrences[element];
    occurrences[element] = key ? key + 1 : 1;
  }
  return occurrences;
};

const part1 = (template, pairs) => {
  const map = new Map();
  const rules = splitOnLineBreak(pairs);
  for (let i = 0; i < rules.length; i++) {
    const [pair, insertion] = rules[i].split(' -> ');
    map.set(pair, insertion);
  }

  let polymer = template.split('');
  for (let i = 0; i < 10; i++) {
    polymer = insert(polymer, map);
  }

  const occurrences = getOccurrences(polymer);
  const values = Object.values(occurrences);
  const leastCommon = Math.min(...values);
  const mostCommon = Math.max(...values);

  return mostCommon - leastCommon;
};

const part2 = () => {
  return null;
};

export const day14 = async () => {
  const input = await getInput(__filename);
  const [template, pairs] = splitOnEmptyLine(input);

  printHeader(__filename, 1);
  console.log(part1(template, pairs));
  printHeader(__filename, 2);
  console.log(part2());
};
