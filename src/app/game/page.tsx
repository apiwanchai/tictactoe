"use client";

import { useState, useEffect } from 'react';

const initialBoard = Array(9).fill(null);

export default function TicTacToe() {
  const [board, setBoard] = useState(initialBoard);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); 
  const [score, setScore] = useState(0);
  const [consecutiveWins, setConsecutiveWins] = useState(0);
  const [winningLine, setWinningLine] = useState<number[] | null>(null); 

  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const checkWinner = (newBoard: any[]) => {
    for (const line of winningLines) {
      const [a, b, c] = line;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinningLine(line);  
        return newBoard[a];
      }
    }
    return null;
  };

  const checkDraw = (newBoard: any[]) => {
    return newBoard.every(cell => cell !== null);
  };

  const handlePlayerMove = (index: number) => {
    if (board[index] || !isPlayerTurn || checkWinner(board)) return; 

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner === 'X') {
      handleWin();
      return;
    }

    if (checkDraw(newBoard)) {
   
      setTimeout(resetBoard, 1000);  
      return;
    }

    setIsPlayerTurn(false); 
  };

  const handleBotMove = () => {
    if (checkWinner(board)) return;

    const newBoard = [...board];
    let botMove;
    do {
      botMove = Math.floor(Math.random() * 9);
    } while (newBoard[botMove]);

    newBoard[botMove] = 'O';
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner === 'O') {
    
      setConsecutiveWins(0); 
      setScore(score - 1); 
      setTimeout(resetBoard, 1000);  
    } else if (checkDraw(newBoard)) {
  
      setTimeout(resetBoard, 1000);
      return;
    }

    setIsPlayerTurn(true); 
  };

  const handleWin = () => {
    const newConsecutiveWins = consecutiveWins + 1;

   

    if (newConsecutiveWins === 3) {
      setScore(score + 2); 
      setConsecutiveWins(0); 
    } else {
      setScore(score + 1);
      setConsecutiveWins(newConsecutiveWins); 
    }

    setTimeout(resetBoard, 1000);  
  };

  const resetBoard = () => {
    setBoard(initialBoard); 
    setIsPlayerTurn(true); 
    setWinningLine(null);  
  };

  useEffect(() => {
    if (!isPlayerTurn) {
      const botTimer = setTimeout(() => {
        handleBotMove();
      }, 1000);

      return () => clearTimeout(botTimer);
    }
  }, [isPlayerTurn, board]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Score: {score}</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handlePlayerMove(idx)}
            disabled={!isPlayerTurn || cell !== null || winningLine !== null}
            className={`w-20 h-20 bg-white text-4xl font-bold border-2 border-gray-400 rounded-md shadow-md hover:bg-blue-100 transition ${
              cell === 'X' ? 'text-red-600' : cell === 'O' ? 'text-blue-600' : ''
            }`} 
          >
            {cell}
          </button>
        ))}
      </div>
    </div>
  );
}
