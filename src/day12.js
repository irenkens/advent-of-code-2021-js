import { getInput, splitOnLineBreak, printHeader } from './util';

const isSmallCave = cave => cave.toLowerCase() === cave;

const getMap = rules => {
  const map = new Map();
  for (let i = 0; i < rules.length; i++) {
    const [a, b] = rules[i].split('-');
    if (map.get(a)) {
      map.set(a, [...map.get(a), b]);
    } else {
      map.set(a, [b]);
    }

    if (map.get(b)) {
      map.set(b, [...map.get(b), a]);
    } else {
      map.set(b, [a]);
    }
  }
  return map;
};

const getPaths = (paths, map) => {
  const newPaths = [];

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    const split = path.split(',');
    const last = split[split.length - 1] || 'start';

    if (last === 'end') {
      newPaths.push(path);
      continue;
    }

    const nextCaves = map.get(last);
    for (let j = 0; j < nextCaves.length; j++) {
      const next = nextCaves[j];
      if (isSmallCave(next) && path.includes(next)) continue;
      newPaths.push(`${path},${next}`);
    }
  }

  return newPaths;
};

const part1 = rules => {
  const map = getMap(rules);
  let paths = ['start'];
  while (!paths.every(p => p.endsWith('end'))) {
    paths = getPaths(paths, map);
  }
  return paths.length;
};

const getPaths2 = (paths, map) => {
  const newPaths = [];

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    const split = path.split(',');
    const last = split[split.length - 1] || 'start';

    if (last === 'end') {
      newPaths.push(path);
      continue;
    }

    const nextCaves = map.get(last);
    for (let j = 0; j < nextCaves.length; j++) {
      const next = nextCaves[j];
      if (next === 'start') continue;

      if (next === 'end' || !isSmallCave(next)) {
        newPaths.push(`${path},${next}`);
        continue;
      }

      const smallCaves = split.filter(cave => isSmallCave(cave));
      const visitedTwice = smallCaves.some(cave => split.filter(p => p === cave).length === 2);
      if (visitedTwice && split.includes(next)) continue;
      newPaths.push(`${path},${next}`);
    }
  }

  return newPaths;
};

const part2 = rules => {
  const map = getMap(rules);
  let paths = ['start'];
  while (!paths.every(p => p.endsWith('end'))) {
    paths = getPaths2(paths, map);
  }
  return paths.length;
};

export const day12 = async () => {
  const input = await getInput(__filename);
  const rules = splitOnLineBreak(input);

  printHeader(__filename, 1);
  console.log(part1(rules));
  printHeader(__filename, 2);
  console.log(part2(rules));
};
