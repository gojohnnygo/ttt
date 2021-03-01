# Getting Started with TTT (tic-tac-toe)

## Quick Demo
```
clone git@github.com:gojohnnygo/ttt.git
cd ttt
yarn install
yarn start
```

## Features
1. FUN - Endless tic-tac-toe fun with friends
2. EASY TO USE - Drop it into any React + Typescript project
3. FLEXIBLE - Play traditional 3x3 tic-tac-toe up or up 20x20. The game engine is flexible and can handle different types of game play with just a little tweaking. Do you want the win condition to be different than the board size? No problem! Do you want to play Connect Four? Doable! Pull requests are welcome. :) 

## How to Use in Your React + TypeScript Project
1. Add the `ttt` [folder](https://github.com/gojohnnygo/ttt/tree/main/src/ttt) to your project
1. Import and use the componet

```
import Board from './ttt/Board';

export default function App() {
  <Board />
}

```

## How to Use Your Own Controls
By default TTT comes with three controls:
1. Resetting to default
2. Incrementing board size (max 20x20)
3. Decrementing board size (min 3x3)

If you want to implement your own controls, you can easily do so with Refs. Functions exposed to you are:
1. `reset()`
2. `increment()`
3. `decrement()`

```
import Board, {BoardRef} from './ttt/Board';

export default function App() {
  const boardRef = useRef<BoardRef>(null);

  return (
    <div className="app">
      <Board ref={boardRef}/>
      <div>
        <button onClick={() => boardRef.current?.reset()}>
          Reset Default
        </button>
        <button
          onClick={() => boardRef.current?.increment()}
        >
          Increase Board Size
        </button>
        <button
          onClick={() => boardRef.current?.decrement()}
        >
          Decrease Board Size
        </button>
      </div>
    </div>
  );
}

```

## Shout Outs

This demo was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
