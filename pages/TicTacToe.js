import React, { useEffect, useState } from "react";
import "./TicTacToe.css";

function TicTacToe() {
  const emptyBoard = Array(9).fill("");

  const [board, setBoard] = useState(emptyBoard);

  const [currentPlayer, setCurrentPlayer] = useState("O");

  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    if (winner) {
      console.log("jogo finalizado!");
      return null;
    }

    if (board[index] !== "") {
      console.log("Posição ocupada!");
      return null;
    }
    setBoard(
      board.map((item, itemIndex) =>
        itemIndex === index ? currentPlayer : item
      )
    );

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkWinner = () => {
    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    possibleWaysToWin.forEach((cells) => {
      if (cells.every((cell) => cell === "O")) setWinner("O");
      if (cells.every((cell) => cell === "X")) setWinner("X");
    });
  };

  function checkDraw() {
    if (board.every((item) => item !== "" && winner === null)) {
      //empate!
      return setWinner("E");
    }
  }

  useEffect(checkWinner, [board]);

  checkDraw();

  function startingPlayer(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const whoPlays =
    `${winner}` === "E"
      ? startingPlayer(1, 2) === 1
        ? "X"
        : "O"
      : `${winner}`;

  const resetGame = () => {
    setCurrentPlayer(whoPlays);
    setBoard(emptyBoard);
    setWinner(null);
  };

  return (
    <main>
      <h1 className="tittle">Jogo da Velha</h1>
      
      <div className="display">
        {(!winner || !winner === "E") ? (
          <h2 className="current-player">
            Jogada do:
            <strong className={currentPlayer}> {currentPlayer}</strong>
          </h2>
        ) : (<h2 className="current-player">Aguardando próximo jogador...</h2>)}
      </div>

      <div className={`board ${winner ? "game-over" : ""}`}>
        {board.map((item, index) => (
          <div
            key={index}
            className={`cell ${item}`}
            onClick={() => handleCellClick(index)}
          >
            {item}
          </div>
        ))}
      </div>

      {winner && (
        <div className="menu">
          {winner === "E" ? (
            <h2 className="winner-message">
              <span className={winner}>
                <span className="X">X</span>
                <span className="O">O</span>
              </span>
              <span className={winner}>EMPATE!</span>
            </h2>
          ) : (
            <h2 className="winner-message">
              <span className={winner}>{winner}</span>
              <span className="E">VENCEDOR!</span>
            </h2>
          )}
          <button onClick={resetGame}>RECOMEÇAR</button>
        </div>
      )}
    </main>
  );
}

export default TicTacToe;
