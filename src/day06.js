import { getInput, printHeader } from './util';

const updateList = list => {
  const updatedList = [];

  for (let i = 0; i < list.length; i++) {
    const timer = list[i];
    if (timer === 0) {
      updatedList.push(6);
      updatedList.push(8);
    } else {
      updatedList.push(timer - 1);
    }
  }

  return updatedList;
};

const part1 = list => {
  let fish = [...list];
  for (let i = 0; i < 80; i++) {
    fish = updateList(fish);
  }
  return fish.length;
};

const updateMap = map => {
  const values = Array.from(map.values());
  for (let timer = 0; timer <= 8; timer++) {
    const numberOfFish = values[timer];
    if (numberOfFish === 0) continue;

    if (timer === 0) {
      map.set(0, map.get(0) - numberOfFish);
      map.set(6, map.get(6) + numberOfFish);
      map.set(8, map.get(8) + numberOfFish);
    } else {
      map.set(timer, map.get(timer) - numberOfFish);
      map.set(timer - 1, map.get(timer - 1) + numberOfFish);
    }
  }
};

const part2 = list => {
  // Create map where Key is timer (0-8), and Value is the number of laternfish with that specific timer value
  const fish = new Map([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0]]);

  for (let i = 0; i < list.length; i++) {
    const timer = list[i];
    fish.set(timer, fish.get(timer) + 1);
  }

  // Simulate 256 days
  for (let i = 0; i < 256; i++) {
    updateMap(fish);
  }

  return Array.from(fish.values()).reduce((a, b) => a + b, 0);
};

export const day6 = async () => {
  const input = await getInput(__filename);
  const list = input.split(',').map(x => +x);

  printHeader(__filename, 1);
  console.log(part1(list));
  printHeader(__filename, 2);
  console.log(part2(list));
};
