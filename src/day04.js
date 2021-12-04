import { getInput, splitOnEmptyLine, splitOnLineBreak, splitOnWhitespace, printHeader } from './util';

const BOARD_SIZE = 5;

const markBoard = (board, draw) => {
  for (let i = 0; i < board.length; i++) {
    for (let k = 0; k < board[i].length; k++) {
      if (board[i][k] === draw) {
        // eslint-disable-next-line
        board[i][k] = 'X';
      }
    }
  }
};

const hasWon = board => {
  for (let i = 0; i < board.length; i++) {
    const rowH = board[i];
    const rowV = board.map(x => x[i]);
    if (rowH.filter(x => x === 'X').length === BOARD_SIZE || rowV.filter(x => x === 'X').length === BOARD_SIZE) {
      return true;
    }
  }

  return false;
};

const getSum = array => array.reduce((a, b) => a + b, 0);

const part1 = (draws, boards) => {
  for (let i = 0; i < draws.length; i++) {
    const draw = draws[i];
    for (let k = 0; k < boards.length; k++) {
      markBoard(boards[k], draw);

      if (i >= BOARD_SIZE && hasWon(boards[k])) {
        const unmarkedSum = getSum(boards[k].flat().filter(x => x !== 'X'));
        return unmarkedSum * draw;
      }
    }
  }
  return -1;
};

const part2 = (draws, boards) => {
  const boardsWon = [];
  for (let i = 0; i < draws.length; i++) {
    const draw = draws[i];
    for (let k = 0; k < boards.length; k++) {
      markBoard(boards[k], draw);

      if (i >= BOARD_SIZE && hasWon(boards[k])) {
        if (!boardsWon.includes(k)) boardsWon.push(k);

        if (boardsWon.length === boards.length) {
          const unmarkedSum = getSum(boards[k].flat().filter(x => x !== 'X'));
          return unmarkedSum * draw;
        }
      }
    }
  }
  return -1;
};

export const day4 = async () => {
  const input = await getInput(__filename);
  const split = splitOnEmptyLine(input);
  const draws = split[0].split(',').map(x => +x);
  const boards = [];
  for (let i = 1; i < split.length; i++) {
    boards[i - 1] = splitOnLineBreak(split[i]).map(rows => splitOnWhitespace(rows.trim()).map(value => +value));
  }

  printHeader(__filename, 1);
  console.log(part1(draws, boards));
  printHeader(__filename, 2);
  console.log(part2(draws, boards));
};
