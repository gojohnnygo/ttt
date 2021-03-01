import React, {useRef} from 'react';

import Board, {BoardRef} from './ttt/Board';

import './App.css';

function App() {
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

export default App;
