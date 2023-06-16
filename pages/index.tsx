import type { NextPage } from "next";
import { useState, useEffect } from "react";

const boardIcons = ["🦚", "🚀", "🤡", "🤖", "👽", "👻", "🐧", "😄"];

const Home: NextPage = () => {
  const [boardData, setBoardData] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [foundCards, setFoundCards] = useState<any[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (foundCards.length > 0 && foundCards.length === boardData.length) {
      setGameOver(true);
    }
  }, [moves]);

  const initialize = () => {
    shuffle();
    setFlippedCards([]);
    setFoundCards([]);
    setMoves(0);
    setGameOver(false);
  };

  const shuffle = () => {
    const shuffledCards = [...boardIcons, ...boardIcons]
      .sort(() => Math.random() - 0.5)
      .map((v) => v);

    console.log(shuffledCards);

    setBoardData(shuffledCards);
  };

  const updateBoardData = (idx: number) => {
    if (!flippedCards.includes(idx)) {
      if (flippedCards.length === 1) {
        const firstIdx = flippedCards[0];
        const secondIdx = idx;

        if (boardData[firstIdx] === boardData[secondIdx]) {
          setFoundCards([...foundCards, firstIdx, secondIdx]);
        }
        setFlippedCards([...flippedCards, idx]);
      } else if (flippedCards.length === 2) {
        setFlippedCards([idx]);
      } else {
        setFlippedCards([...flippedCards, idx]);
      }

      setMoves((prev) => prev + 1);
    }
  };

  return (
    <div className="container">
      <div className="menu">
        <p>Moves: {moves}</p>
        <button
          onClick={() => initialize()}
          className="reset-btn"
          disabled={!gameOver}
        >
          Reset
        </button>
        <p>{`Game Over: ${gameOver}`}</p>
      </div>

      <div className="board">
        {boardData.map((data: any, idx: any) => {
          const flipped = flippedCards.includes(idx) ? "flipped" : "";
          const found = foundCards.includes(idx) ? "flipped found" : "";
          return (
            <div
              onClick={() => {
                updateBoardData(idx);
              }}
              key={idx}
              className={`card ${flipped} ${found}`}
            >
              <div className="card-front">{data}</div>
              <div className="card-back"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
