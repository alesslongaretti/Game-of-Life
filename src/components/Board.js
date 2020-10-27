import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import Buttons from "./Buttons";
import BottomButtons from "./BottomButtons";
import { SketchPicker } from "react-color";

const numRows = 25;
const numCols = 25;
const operations = Array(9)
  .fill(1)
  .map((x, y) => [Math.floor(y / 3) - 1, (y % 3) - 1]);

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

const Board = () => {
  const [color, setColor] = useState("#ff4500");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [currGen, setCurrGen] = useState(0);
  const speedRef = useRef(300);
  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      let checkGrid = false;
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
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
    setTimeout(runSimulation, speedRef.current);
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
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, x) =>
          rows.map((col, y) => (
            <div
              key={`${x}-${y}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[x][y] = grid[x][y] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
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
