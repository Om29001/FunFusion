import React, { useState } from "react"

const ValueDialog = ({ message, onConfirm, onCancel }) => {
  const [value, setValue] = useState()
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
      tabIndex={-1}
    >
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex">
          <p className="text-lg">{message}</p>
          <input
            type="number"
            className="text-lg border-2 border-blue-500 ml-2"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => value && onConfirm(value)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default ValueDialog
