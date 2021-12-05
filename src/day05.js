import { getInput, splitOnLineBreak, printHeader } from './util';

// Returns an array of string point coordinates of the line between a start and end point.
// E.g. start='0,5' end='5,5' returns [ '0,5', '1,5', '2,5', '3,5', '4,5', '5,5' ]
// By default ignore diagonal lines. Set diagonal to true to allow for diagonal lines.
const getPoints = (start, end, diagonal = false) => {
  const splitStart = start.split(',');
  const splitEnd = end.split(',');
  const startPoint = { x: +splitStart[0], y: +splitStart[1] };
  const endPoint = { x: +splitEnd[0], y: +splitEnd[1] };
  const points = [];

  if (startPoint.x === endPoint.x) {
    const smallestY = Math.min(startPoint.y, endPoint.y);
    const biggestY = Math.max(startPoint.y, endPoint.y);
    for (let y = smallestY; y <= biggestY; y++) {
      const point = `${startPoint.x},${y}`;
      points.push(point);
    }
    return points;
  }

  if (startPoint.y === endPoint.y) {
    const smallestX = Math.min(startPoint.x, endPoint.x);
    const biggestX = Math.max(startPoint.x, endPoint.x);
    for (let x = smallestX; x <= biggestX; x++) {
      const point = `${x},${startPoint.y}`;
      points.push(point);
    }
    return points;
  }

  if (diagonal) {
    const signX = startPoint.x > endPoint.x ? -1 : 1;
    const signY = startPoint.y > endPoint.y ? -1 : 1;
    const numPoints = Math.abs(startPoint.x - endPoint.x);

    for (let i = 0; i <= numPoints; i++) {
      const x = startPoint.x + i * signX;
      const y = startPoint.y + i * signY;
      const point = `${x},${y}`;
      points.push(point);
    }
  }

  return points;
};

const getOverlappingPoints = (lines, diagonals = false) => {
  const pointCount = new Map();

  lines.forEach(line => {
    const [start, end] = line.split(' -> ');
    const points = getPoints(start, end, diagonals);

    points.forEach(point => {
      const count = pointCount.has(point) ? pointCount.get(point) + 1 : 1;
      pointCount.set(point, count);
    });
  });

  return Array.from(pointCount.values()).filter(v => v >= 2).length;
};

const part1 = lines => {
  return getOverlappingPoints(lines);
};

const part2 = lines => {
  return getOverlappingPoints(lines, true);
};

export const day5 = async () => {
  const input = await getInput(__filename);
  const lines = splitOnLineBreak(input);

  printHeader(__filename, 1);
  console.log(part1(lines));
  printHeader(__filename, 2);
  console.log(part2(lines));
};
