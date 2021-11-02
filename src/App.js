import { useEffect, useState } from "react";

const width = 3;

const boardColors = ["blue", "orange", "green"];
let conqueredIndices = [];

export default function App() {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);

  const createBoard = () => {
    const randomColorArrangement = [];

    for (let i = 0; i < width * width; i++) {
      const randomNumber = Math.floor(Math.random() * boardColors.length);
      const randomColor = boardColors[randomNumber];
      randomColorArrangement.push(randomColor);
    }

    setCurrentColorArrangement(randomColorArrangement);
  };

  const pickColor = (color, currentInd) => {
    if (conqueredIndices.includes(currentInd)) return;

    const rows = Array(width)
      .fill()
      .map((i, index) => index + 1);

    for (let i = 0; i < rows.length; i++) {
      const firstIndexInRow = (rows[i] - 1) * width;
      for (let n = firstIndexInRow; n <= firstIndexInRow + width - 1; n++) {
        if (n === 0) {
          if (!conqueredIndices.includes(n)) conqueredIndices.push(n);
          continue;
        }

        if (
          currentColorArrangement[n] === currentColorArrangement[n - 1] &&
          currentColorArrangement[n - 1] === color

          //   ||
          // (currentColorArrangement[n] === currentColorArrangement[n - width] &&
          //   currentColorArrangement[n - width] === color)
        ) {
          if (conqueredIndices.includes(n)) {
            continue;
          }
          conqueredIndices.push(n);
        }
      }
    }

    setCurrentColorArrangement((oldVal) => {
      const newArragement = oldVal.map((col, ind) => {
        if (conqueredIndices.includes(ind)) {
          return color;
        }
        return col;
      });
      return newArragement;
    });
  };

  useEffect(() => {
    createBoard();
  }, []);

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((boardColor, index) => (
          <div
            key={index}
            style={{
              backgroundColor: boardColor
            }}
            alt={boardColor}
            onClick={() => pickColor(boardColor, index)}
          />
        ))}
      </div>
    </div>
  );
}
