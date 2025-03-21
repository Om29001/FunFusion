import { memo, useRef, useState } from "react"

function SequenceFollower() {
  const sequence = useRef([])
  const [isDisabled, setIsDisabled] = useState(false)
  const [matrix, setMatrix] = useState([
    [
      { value: 1, color: "bg-white", clicked: false },
      { value: 1, color: "bg-white", clicked: false },
      { value: 1, color: "bg-white", clicked: false },
    ],
    [
      { value: 1, color: "bg-white", clicked: false },
      { value: 1, color: "bg-white", clicked: false },
      { value: 1, color: "bg-white", clicked: false },
    ],
    [
      { value: 1, color: "bg-white", clicked: false },
      { value: 1, color: "bg-white", clicked: false },
      { value: 1, color: "bg-white", clicked: false },
    ],
  ])

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

  const startReverse = async () => {
    setIsDisabled(true)
    const s = [...sequence.current]
    sequence.current = []

    for (let i = 0; i < s.length; i++) {
      const [row, col] = s[i]
      setMatrix(prevMatrix => {
        const newMatrix = prevMatrix.map(innerArray => innerArray.slice())
        newMatrix[row][col].value = 1
        newMatrix[row][col].color = "bg-white"
        newMatrix[row][col].clicked = false

        return newMatrix
      })
      await delay(300)
    }
    setIsDisabled(false)
  }

  const handleClick = data => {
    console.log("we")
    const [row, col] = data
    if (matrix[row][col].clicked) {
      // If already clicked, do nothing
      return
    }

    sequence.current.push(data)
    setMatrix(prevMatrix => {
      const newMatrix = prevMatrix.map(innerArray => innerArray.slice())
      newMatrix[row][col].value = -1
      newMatrix[row][col].color = getRandomTailwindColor()
      newMatrix[row][col].clicked = true
      return newMatrix
    })

    if (sequence.current.length === 9) {
      startReverse()
    }
  }

  const tailwindColors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
  ]

  function getRandomTailwindColor() {
    const randomIndex = Math.floor(Math.random() * tailwindColors.length)
    return tailwindColors[randomIndex]
  }

  return (
    <div className="container max-w-md m-5 mx-auto px-4 py-8">
      <div className="flex justify-center mb-5">
        <h1 className="font-serif text-lg">
          Click the buttons and it will follow you in the end
        </h1>
      </div>

      <div className="grid grid-cols-3 grid-rows-3 gap-1 max-h-[60vh]">
        {matrix.map((row, i) =>
          row.map((item, j) => (
            <ViewBoard
              key={`${i}-${j}`}
              data={item}
              handleClick={() => handleClick([i, j])}
              isDisabled={isDisabled}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default SequenceFollower

// eslint-disable-next-line react/display-name, react/prop-types
const ViewBoard = memo(({ data, handleClick, isDisabled }) => {
  // eslint-disable-next-line react/prop-types
  const { value, color } = data
  if (value === undefined || value === null)
    return <div className="flex p-2 min-w-0.5"></div>
  return (
    <div
      className={`flex border-2 border-black p-2 min-w-1 min-h-16 ${color}`}
      onClick={() => {
        if (!isDisabled) handleClick()
      }}
    ></div>
  )
})
