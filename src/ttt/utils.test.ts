import {BoardMatrix} from './Board';

import {
  createBoard,
  copyBoard,
  checkHorizontal,
  checkVertical,
  checkDiagonal,
  checkAntiDiagonal
} from './utils';

const board: BoardMatrix = [
  [[ 1, true], [-1, false], []],
  [[-1, false], [ 1,  true], []],
  [[-1, false], [], [1, true]]
];

it('creates a board', () => {
  expect(createBoard(3).length).toEqual(3);
  expect(createBoard(20).length).toEqual(20);
});

it('copies a board', () => {
  const boardCopy = copyBoard(board);

  expect(boardCopy === board).toBe(false);

  boardCopy.forEach((row, r) => {
    row.forEach((col, c) => {
      col.forEach((tuple) => {
        expect(boardCopy[r][c][0]).toEqual(board[r][c][0]);
        expect(boardCopy[r][c][1]).toEqual(board[r][c][1]);
      }) 
    })
  });
});

it('checks horizontal run', () => {
  const board: BoardMatrix = [
    [[ 1, false], [ 1, false], []],
    [[-1, false], [-1, false], [-1, false]],
    [[1, false], [-1, false], [1, false]]
  ];

  expect(checkHorizontal(board, 1, 2, -1, 3)).toBe(true);
  expect(checkHorizontal(board, 2, 1, -1, 3)).toBe(false);
});

it('checks vertical run', () => {
  const board: BoardMatrix = [
    [[ 1, false], [ -1, false], []],
    [[-1, false], [-1, false], [-1, false]],
    [[1, false], [-1, false], [1, false]]
  ];

  expect(checkVertical(board, 0, 1, -1, 3)).toBe(true);
  expect(checkVertical(board, 0, 0, -1, 3)).toBe(false);
});

it('checks diagonal run', () => {
  let board: BoardMatrix = [
    [[ 1, false], [ -1, false], []],
    [[-1, false], [1, false], [-1, false]],
    [[1, false], [-1, false], [1, false]]
  ];

  expect(checkDiagonal(board, 1, 1, 1, 3)).toBe(true);

  board = [
    [[ 1, false], [ -1, false], []],
    [[-1, false], [-1, false], [-1, false]],
    [[1, false], [-1, false], [1, false]]
  ];
  expect(checkDiagonal(board, 1, 1, -1, 3)).toBe(false);
});

it('checks antidiagonal run', () => {
  let board: BoardMatrix = [
    [[ 1, false], [ -1, false], [ 1, false]],
    [[-1, false], [1, false], [-1, false]],
    [[1, false], [-1, false], [1, false]]
  ];

  expect(checkAntiDiagonal(board, 1, 1, 1, 3)).toBe(true);

  board = [
    [[ 1, false], [ -1, false], [ 1, false]],
    [[-1, false], [-1, false], [-1, false]],
    [[1, false], [-1, false], [1, false]]
  ];
  expect(checkAntiDiagonal(board, 1, 1, -1, 3)).toBe(false);
});
