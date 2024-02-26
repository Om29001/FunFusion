import React from "react"
import Cursor from "./Cursors"

const ConfirmationBox = ({ message, onConfirm, onCancel, showCursors }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 ${
        showCursors && "cursor-none"
      }`}
      tabIndex={-1}
    >
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="text-lg">{message}</p>
        <div className="mt-4 flex justify-end">
          {onCancel && (
            <button
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded"
            >
              Cancel
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded  ${
              showCursors && "cursor-none"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationBox
