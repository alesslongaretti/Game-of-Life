import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import Buttons from "./Buttons";
import BottomButtons from "./BottomButtons";
import { SketchPicker } from "react-color";

const numRows = 25;
const numCols = 25;
const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
]
const generateEmptyGrid = () => {
  const rows = [];
  //iterate and create rowns and column
  for (let i = 0; i < numRows; i++) {
    // function returns 0, the values should be 0 at first
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

const Board = () => {
  const [color, setColor] = useState("#ff4500");
  const [showColorPicker, setShowColorPicker] = useState(false);
  // state of grid
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [currGen, setCurrGen] = useState(0);
  const speedRef = useRef(300);

  const [running, setRunning] = useState(false);
// use ref to keep updating running state
  const runningRef = useRef(running);
  runningRef.current = running;

  // useCallback to not recreate at every render
  const runSimulation = useCallback(() => {
    // whatever value of running is
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      let checkGrid = false;
      checkGrid = false
      return produce(g, (gridCopy) => {
        // go through every value of grid
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            // compute # of neighbors it has
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });
             // live cell with fewer than 2 live neighbors dies or live cell with more than 3 neighbors dies
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            //dead cell with 3 neighbors becomes a live cell
            } else if (g[i][k] === 0 && neighbors === 3) {
              checkGrid = true;
              gridCopy[i][k] = 1;
            }
          }
        }
        if (checkGrid) {
          setCurrGen((num) => num + .5);
        }
      });
    });
    setTimeout(runSimulation,  speedRef.current);
  }, []);

  return (
    <div>
      <div className="top-content">
        <div className="data">
          <p>Generation: {currGen}</p>
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              setRunning(!running);
              if (!running) {
                runningRef.current = true;
                runSimulation();
              }
            }}
          >
            {running ? "stop" : "start"}
          </button>
          <Buttons
            setGrid={setGrid}
            numCols={numCols}
            numRows={numRows}
            generateEmptyGrid={generateEmptyGrid}
          />
        </div>
      </div>
      <div
      // turns it into a grid
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, x) =>
          rows.map((col, y) => (
            <div
            // bc its an array you need a unique key
              key={`${x}-${y}`}
              // set current index to 1. use produce function will help update
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  // toggle from 0 to 1
                  gridCopy[x][y] = grid[x][y] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                // if its dead be white
                backgroundColor: grid[x][y] ? color : "white",
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
      <div className="bottom-content">
        <BottomButtons speedRef={speedRef} />
        <button
          style={{ width: "90px" }}
          onClick={() =>
            setShowColorPicker((showColorPicker) => !showColorPicker)
          }
        >
          {showColorPicker ? "Close" : "Choose a Color"}
        </button>
        {showColorPicker && (
          <div style={{ position: "absolute" }}>
            <SketchPicker
              color={color}
              onChange={(color) => {
                setColor(color.hex);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
