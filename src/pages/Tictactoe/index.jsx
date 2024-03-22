import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

function Index() {
  const [isGameCompleted, setIsGameCompleted] = useState(false)
  const [moves, setMoves] = useState(0)
  const [board, setBoard] = useState(Array(9).fill(null)) // Representing the tic-tac-toe board
  const [currentPlayer, setCurrentPlayer] = useState("X")
  const [isComputer, setIsComputer] = useState(false)

  // Function to handle a click on a cell
  const handleClick = index => {
    if (board[index] === null && !isGameCompleted) {
      const newBoard = [...board]
      newBoard[index] = currentPlayer
      setBoard(newBoard)
      setMoves(prev => prev + 1)

      // Check if the current player wins
      if (checkWinner(newBoard, currentPlayer)) {
        setIsGameCompleted(true)
      } else if (moves === 8) {
        // Check if it's a draw
        setIsGameCompleted(true)
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X")

        // If playing against the computer, make the computer move
        if (isComputer && currentPlayer === "X") {
          setTimeout(() => {
            makeComputerMove(newBoard)
          }, 1000)
        }
      }
    }
  }

  // Function to make a move for the computer
  const makeComputerMove = newBoard => {
    const winningMoves = getWinningMoves(newBoard, "O")
    const blockingMoves = getWinningMoves(newBoard, "X")
    const availableMoves = newBoard.reduce((acc, cell, index) => {
      if (cell === null) acc.push(index)
      return acc
    }, [])

    let chosenCell

    // 1. Check for winning moves
    if (winningMoves.length > 0) {
      chosenCell = winningMoves[0] // Choose the first winning move
    }
    // 2. Check for blocking moves
    else if (blockingMoves.length > 0) {
      chosenCell = blockingMoves[0] // Choose the first blocking move
    }
    // 3. Choose the center if available
    else if (availableMoves.includes(4)) {
      chosenCell = 4
    }
    // 4. Choose a corner if available
    else if (availableMoves.some(move => [0, 2, 6, 8].includes(move))) {
      chosenCell = availableMoves.find(move => [0, 2, 6, 8].includes(move))
    }
    // 5. Choose any remaining available move
    else {
      chosenCell = availableMoves[0]
    }

    const updatedBoard = [...newBoard]
    updatedBoard[chosenCell] = "O"

    setBoard(updatedBoard)
    setMoves(prev => prev + 1)

    if (checkWinner(updatedBoard, "O")) {
      setIsGameCompleted(true)
    } else if (moves === 8) {
      setIsGameCompleted(true)
    } else {
      setCurrentPlayer("X")
    }
  }
  // Function to get winning moves for a player
  const getWinningMoves = (currentBoard, player) => {
    const winningMoves = []
    const emptyCells = currentBoard.reduce((acc, cell, index) => {
      if (cell === null) acc.push(index)
      return acc
    }, [])

    for (let i = 0; i < emptyCells.length; i++) {
      const testBoard = [...currentBoard]
      testBoard[emptyCells[i]] = player
      if (checkWinner(testBoard, player)) {
        winningMoves.push(emptyCells[i])
      }
    }

    return winningMoves
  }

  // Function to check if there is a winner
  const checkWinner = (board, player) => {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i]
      if (board[a] === player && board[b] === player && board[c] === player) {
        return true
      }
    }
    return false
  }

  // Function to handle game reset
  const handleReset = () => {
    setBoard(Array(9).fill(null))
    setIsGameCompleted(false)
    setCurrentPlayer("X")
    setMoves(0)
    setIsComputer(false) // Resetting the vs computer mode
  }

  // Function to handle "vs Computer" button click
  const handleVsComputerClick = () => {
    setIsComputer(true)
    setBoard(Array(9).fill(null))
    setIsGameCompleted(false)
    setCurrentPlayer("X")
    setMoves(0)
  }

  return (
    <div className="container justify-center items-center">
      <div className="flex flex-wrap justify-around items-center my-5 mx-auto max-w-lg">
        <ViewBoard data={"X"} title=": Player 1" />
        <ViewBoard data={"O"} title=": Player 2" />
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500"
          onClick={handleReset}
        >
          Reset
        </button>
        {!isComputer && (
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500"
            onClick={handleVsComputerClick}
          >
            vs Computer
          </button>
        )}
      </div>
      <div className="container max-w-md m-5 mx-auto px-4 py-8 border-2">
        {isGameCompleted ? (
          <div className="text-center">
            <h2>
              {checkWinner(board, "X") && !isComputer
                ? "Player 1"
                : isComputer && checkWinner(board, "X")
                ? "You"
                : checkWinner(board, "O")
                ? "Player 2"
                : "It's a draw!"}{" "}
              wins the game!
            </h2>
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-5"
              onClick={handleReset}
            >
              Restart
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 grid-rows-3 gap-1 max-h-[60vh]">
            {board.map((cell, index) => (
              <motion.div
                key={index}
                className="relative aspect-w-1 aspect-h-1 shadow-2xl"
                style={{
                  padding: "2px",
                  width: "100%",
                  height: "calc(60vh / 6 - 4px)",
                }}
                onClick={() => handleClick(index)}
              >
                <motion.div
                  className="w-full h-full bg-blue-500 rounded-lg shadow-md absolute flex justify-center items-center text-3xl overflow-hidden"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: board[index] ? 0 : 180 }}
                  transition={{ duration: 0.5 }}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {cell}
                </motion.div>
                <motion.div
                  className="w-full h-full bg-green-500 rounded-lg shadow-md absolute flex justify-center items-center"
                  initial={{ rotateY: 180 }}
                  animate={{ rotateY: board[index] ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ backfaceVisibility: "hidden" }}
                ></motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Index

const ViewBoard = ({ data, title }) => {
  return (
    <div
      className="flex
    border-2 p-2"
    >
      <h1 className="text-xl pr-2">{data}</h1>
      <span className="text-xl font-medium text-gray-900">{title}</span>
    </div>
  )
}
