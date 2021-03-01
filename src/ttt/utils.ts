import {BoardMatrix, Player} from './Board';

export function createBoard(size: number): BoardMatrix {
  return [...new Array(size)].map(
    () => new Array(size).fill([])
  )
}

/**
 * This function houses all of the logic for the tic tac toe gameplay. While
 * its purpose is for a traditional 3x3 games, it's flexible enough to handle
 * varying board sizes and win conditions, and with a little tweaking, it could
 * even power variations of Connect Four.
 * 
 * Your imagination is the only limit!
 * 
 * The board's data structure is a matrix of tuple values that mirror the tiles
 * of the board. The tuple at zero indicates the player; the tuple at one
 * indicates if a sequence has been found. See the example below.
 * 
 * [
 *   [[ 1, true], [-1, false], []],
 *   [[-1, false], [ 1,  true], []],
 *   [[-1, false], [], [1, true]]
 * ]
 */
export function updateBoard(
  board: BoardMatrix,
  row: number,
  col: number,
  value: Player,
  depth: number
): {
  isWin: boolean,
  newBoard: BoardMatrix
} {
  const boardCopy = copyBoard(board);
  boardCopy[row][col] = [value, false];

  const isWin = (
    checkHorizontal(boardCopy, row, col, value, depth)
    || checkVertical(boardCopy, row, col, value, depth)
    || checkDiagonal(boardCopy, row, col, value, depth)
    || checkAntiDiagonal(boardCopy, row, col, value, depth)
  );
  
  return {
    isWin,
    newBoard: boardCopy
  }
}

export function copyBoard(board: BoardMatrix): BoardMatrix {
  return board.map(
    row => row.map(
      col => [...col]
    )
  );
} 

export function checkHorizontal (
  board: BoardMatrix,
  row: number,
  col: number,
  value: Player,
  depth: number
) {
  let sequence = 1;

  let p1 = col - 1;
  let p2 = col + 1;

  // check for sequences to the left
  while (sequence < depth && board[row]?.[p1]?.[0] === value) { 
    sequence++;
    p1--;
  }

  // move pointer back in bounds
  p1++;

  // check for sequences to the right
  while (sequence < depth && board[row]?.[p2]?.[0] === value) {  
    sequence++;
    p2++;
  }

  if (sequence === depth) {
    for (let i = 0; i < depth; i++) {
      board[row][p1][1] = true;
      p1++;
    }
    
    return true;
  } else {
    return false;
  }
}

export function checkVertical(
  board: BoardMatrix,
  row: number,
  col: number,
  value: Player,
  depth: number
) {
  let sequence = 1;

  let p1 = row - 1;
  let p2 = row + 1;
  
  // check for sequences above
  while (sequence < depth && board[p1]?.[col]?.[0] === value) {
    sequence++;
    p1--;
  }

  // move pointer back in bounds
  p1++;

  // check for sequences below
  while (sequence < depth && board[p2]?.[col]?.[0] === value) {
    sequence++;
    p2++;
  }

  if (sequence === depth) {
    for (let i = 0; i < depth; i++) {
      board[p1][col][1] = true;
      p1++;
    }

    return true;
  } else {
    return false;
  }
}

export function checkDiagonal(
  board: BoardMatrix,
  row: number,
  col: number,
  value: Player,
  depth: number
) {
  let sequence = 1;

  let pRow = row - 1;
  let pCol = col - 1;
  
  // check for sequences to the left
  while (sequence < depth && board[pRow]?.[pCol]?.[0] === value) {
    sequence++;
    pRow--;
    pCol--;
  }

  // reset pointers
  pRow = row + 1;
  pCol = col + 1;

  // check for sequences to the right
  while (sequence < depth && board[pRow]?.[pCol]?.[0] === value) {
    sequence++;
    pRow++;
    pCol++;
  }

  // move pointers back in bounds
  pRow--;
  pCol--;

  if (sequence === depth) {
    for (let i = 0; i < depth; i++) {
      board[pRow][pCol][1] = true;
      pRow--;
      pCol--;
    }
    
    return true;
  } else {
    return false;
  }
}

export function checkAntiDiagonal(
  board: BoardMatrix,
  row: number,
  col: number,
  value: Player,
  depth: number
) {
  let sequence = 1;

  let pRow = row + 1;
  let pCol = col - 1;
  
  // check for sequences to the left
  while (sequence < depth && board[pRow]?.[pCol]?.[0] === value) {
    sequence++;
    pRow++;
    pCol--;
  }

  // reset pointers
  pRow = row - 1;
  pCol = col + 1;

  // check for sequences to the right
  while (sequence < depth && board[pRow]?.[pCol]?.[0] === value) {
    sequence++;
    pRow--;
    pCol++;
  }

  // move pointers back in bounds
  pRow++;
  pCol--;

  if (sequence === depth) {
    for (let i = 0; i < depth; i++) {
      board[pRow][pCol][1] = true;
      pRow++;
      pCol--;
    }

    return true;
  } else {
    return false;
  }
}
