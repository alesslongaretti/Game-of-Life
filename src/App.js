import React from "react";
import "./App.css";
import Board from "./components/Board";
import Instructions from "./components/Instructions";

function App() {
  return (
    <div className="App">
      <h1 className="Title">Conway's Game of Life</h1>
      <div className="Content">
        <Board />
        <Instructions />
      </div>
    </div>
  );
}

export default App;
