import React from "react";

const BottomButtons = (props) => {
  return (
    <div>
      <button
        onClick={() => {
          props.speedRef.current = 700;
        }}
      >
        Slower
      </button>
      <button
        onClick={() => {
          props.speedRef.current = 500;
        }}
      >
        Slow
      </button>
      <button
        onClick={() => {
          props.speedRef.current = 300;
        }}
      >
        Normal
      </button>
      <button
        onClick={() => {
          props.speedRef.current = 200;
        }}
      >
        Fast
      </button>
      <button
        onClick={() => {
          props.speedRef.current = 5;
        }}
      >
        Faster
      </button>
    </div>
  );
};

export default BottomButtons;