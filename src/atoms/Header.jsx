import React from "react"
import { Link } from "react-router-dom"
function Header() {
  return (
    <header className="text-gray-600 body-font bg-orange-400 w-full">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-2xl">FunFusion</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center text-gray-900">
          <Link to="/" className="mr-5 hover:text-gray-900">
            Home
          </Link>
          <Link to="/calculator" className="mr-5 hover:text-gray-600">
            Calculator
          </Link>
          <Link to="/memorygame" className="mr-5 hover:text-gray-600">
            Memory Game
          </Link>
          <Link to="/tictactoe" className="mr-5 hover:text-gray-600">
            Tic-tac-toe
          </Link>
          <Link to="/coinflip" className="mr-5 hover:text-gray-600">
            Coin Flip
          </Link>
          <Link to="/sequence" className="mr-5 hover:text-gray-600">
            Sequence Follower
          </Link>
          <Link to="/texteditor" className="mr-5 hover:text-gray-600">
            Text Editor
          </Link>
          <Link to="/random" className="mr-5 hover:text-gray-600">
            Random
          </Link>
        </nav>
      </div>
      <hr />
    </header>
  )
}

export default Header
