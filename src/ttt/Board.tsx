import {forwardRef, Ref, useEffect, useReducer, useImperativeHandle} from 'react';

import Tile from './Tile';
import {createBoard, updateBoard} from './utils';

import './Board.css';

export enum Player {p1 = 1, p2 = -1};
export type TileTuple = [Player, boolean] | [];
export type BoardMatrix = TileTuple[][];

export interface BoardRef {
  decrement(): void,
  increment(): void,
  replay(): void,
  reset(): void
}

interface Props {}

interface State {
  board: BoardMatrix,
  currPlayer: Player,
  isTie: boolean,
  isWin: boolean,
  turns: number
}

interface Replay {
  type: 'replay'
}

interface Resize {
  type: 'decrement' | 'increment',
}

interface Reset {
  type: 'reset'
}

interface Turn {
  type: 'turn',
  payload: {
    row: number,
    col: number
  }
}

const {localStorage} = window;
const storage = localStorage.getItem('state')
  ? JSON.parse(localStorage.getItem('state')!)
  : null;

const DEFAULT_SIZE = 3;
const INITIAL_GAME_STATE = {
  board: createBoard(DEFAULT_SIZE),
  currPlayer: Player.p1,
  isTie: false,
  isWin: false,
  turns: 0
}
const SAVED_GAME_STATE = {
  board: storage?.board,
  currPlayer: storage?.currPlayer,
  isTie: storage?.isTie,
  isWin: storage?.isWin,
  turns: storage?.turns
}

function reducer(state: State, action: Replay | Resize | Reset | Turn) {
  const {
    board,
    currPlayer,
    turns
  } = state;

  switch (action.type) {
    case 'decrement':
      return {
        ...INITIAL_GAME_STATE,
        board: createBoard(board.length - 1)
      };
    case 'increment':
      return {
        ...INITIAL_GAME_STATE,
        board: createBoard(board.length + 1)
      };
    case 'replay':
        return {
          ...INITIAL_GAME_STATE,
          board: createBoard(board.length)
        }
    case 'reset':
      return {
        ...INITIAL_GAME_STATE,
        board: createBoard(DEFAULT_SIZE)
      };
    case 'turn':
      const {payload: {row, col}} = action;
      const {
        isWin,
        newBoard
      } = updateBoard(
        board,
        row,
        col,
        currPlayer,
        board.length
      );
      const isBoardFull = turns + 1 === Math.pow(newBoard.length, 2);

      return {
        board: newBoard,
        currPlayer: (isWin || isBoardFull)
          ? currPlayer
          : currPlayer === Player.p1
            ? Player.p2
            : Player.p1,
        isTie: !isWin && isBoardFull,
        isWin: isWin,
        turns: turns + 1
      }
    default:
      throw new Error();
  }
}

export default forwardRef(function Board(props: Props, ref: Ref<BoardRef>) {
  const [state, dispatch] = useReducer(
    reducer, 
    storage ? SAVED_GAME_STATE : INITIAL_GAME_STATE 
  );
  const {
    board,
    currPlayer,
    isTie,
    isWin
  } = state;

  useEffect(() => {
    const unloadHandler = () => {
      const {localStorage} = window;
      localStorage.setItem('state', JSON.stringify(state));
    }
    window.addEventListener('beforeunload', unloadHandler);

    return () => {
      window.removeEventListener('beforeunload', unloadHandler);
    }
  }); 

  useEffect(() => {
    if (isTie) {
      if (window.confirm("It's a tie! Play again?")) {
        dispatch({type: 'replay'});
      }
    }

    if (isWin) {
      const player = currPlayer === Player.p1 ? "X" : "O";
      if (window.confirm(`${player} won the game! Play again?`)) {
        dispatch({type: 'replay'});
      }
    }    
  }, [
    currPlayer,
    isTie,
    isWin,
  ]);

  useImperativeHandle(ref, () => ({
    decrement: () => dispatch({type: 'decrement'}),
    increment: () => dispatch({type: 'increment'}),
    replay: () => dispatch({type: 'replay'}),
    reset: () => dispatch({type: 'reset'})
  }));

  return (
    <>
      <div className="board">
      {
        board.map((row, r) => (
          <div 
            key={r}
            className="board-row"
          >
            {
              row.map((col, c) => (
                <Tile
                  col={c}
                  isDisabled={(
                    isTie
                    || isWin
                    || col?.[0] === Player.p1
                    || col?.[0] === Player.p2
                    || false
                  )}
                  isSequence={col?.[1] || false}
                  key={`${r}-${c}`}
                  onClick={(row, col) => 
                    dispatch({
                      type: 'turn',
                      payload: {row, col}
                    }
                  )}
                  row={r}
                  value={col ? col[0] : col}
                />
              ))
            }
          </div>
        ))
      }
      </div>
      {
        !ref && (
          <div>
            <button onClick={() => dispatch({type: 'reset'})}>
              Reset Default
            </button>
            <button
              disabled={isTie || isWin || board.length >= 20}
              onClick={() => dispatch({type: 'increment'})}
            >
              Increase Board Size
            </button>
            <button
              disabled={isTie || isWin || board.length <= 3}
              onClick={() => dispatch({type: 'decrement'})}
            >
              Decrease Board Size
            </button>
          </div>
        )
      }
    </>
  );
});
