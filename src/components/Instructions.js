import React from "react";

const Instructions = (props) => {
  return (
    <div className="rules">
      <h1 className="rules-title">Rules</h1>
      <h4>
        The universe of the Game of Life is an infinite, two-dimensional
        orthogonal grid of square cells, each of which is in one of two possible
        states, live or dead, (or populated and unpopulated, respectively).
        Every cell interacts with its eight neighbours, which are the cells that
        are horizontally, vertically, or diagonally adjacent. At each step in
        time, the following transitions occur:
      </h4>
      <div className="rules-content">
        <p>
          1. Any live cell with fewer than two live neighbours dies, as if by
          underpopulation.
        </p>
        <p>
          2. Any live cell with two or three live neighbours lives on to the next
          generation.
        </p>
        <p>
          3. Any live cell with more than three live neighbours dies, as if by
          overpopulation.
        </p>
        <p>
          4. Any dead cell with exactly three live neighbours becomes a live cell,
          as if by reproduction.
        </p>
      </div>

      <h4>
        These rules, which compare the behavior of the automaton to real life,
        can be condensed into the following:
      </h4>
      <div className="rules-content">
        <p> 1. Any live cell with two or three live neighbours survives.</p>
        <p> 2. Any dead cell with three live neighbours becomes a live cell.</p>
        <p>
          3. All other live cells die in the next generation. Similarly, all other
          dead cells stay dead.
        </p>
      </div>
    </div>
  );
};

export default Instructions;
