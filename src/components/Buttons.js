import React from "react";

const Buttons = (props) => {
  return (
    <div className="buttons">
      <button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < props.numRows; i++) {
            rows.push(
              Array.from(Array(props.numCols), () =>
                Math.random() > 0.7 ? 1 : 0
              )
            );
          }

          props.setGrid(rows);
        }}
      >
        random
      </button>
      <button
        onClick={() => {
          props.setGrid(props.generateEmptyGrid());
          window.location.reload();
        }}
      >
        clear
      </button>
    </div>
  );
};

export default Buttons;
