import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

function FlipCard() {
  const [isGameCompleted, setIsGameCompleted] = useState(false)
  const [stopClick, setStopClick] = useState(false)
  const [cardData, setCardData] = useState([])
  const [score, setScore] = useState(0)
  const [count, setCount] = useState(0)
  const [moves, setMoves] = useState(0)
  const [timer, setTimer] = useState(0)
  const prevCardData = useRef(null)

  const flipCard = (index, value) => {
    setCardData(prev => {
      const updatedCards = prev.map((c, i) => {
        if (i === index) {
          return {
            ...c,
            isFlipped: value,
          }
        }
        return c
      })
      return updatedCards
    })
  }

  const handleReset = () => {
    setCount(0)
    setMoves(0)
    setScore(0)
    setTimer(0)
    setCardData(generateCardData({ x: 6, y: 6 }))
  }

  const handleClick = async (card, index) => {
    setStopClick(true)
    setMoves(prev => prev + 1)
    if (count === 0) {
      setCount(prev => prev + 1)
      prevCardData.current = card
      prevCardData.current["index"] = index
      flipCard(index, true)
    } else {
      flipCard(index, true)
      if (prevCardData.current?.data === card.data) setScore(prev => prev + 1)
      else {
        await delay(1000)
        flipCard(index, false)
        flipCard(prevCardData.current?.index, false)
      }
      setCount(0)
    }
    setStopClick(false)
  }

  useEffect(() => {
    setCardData(generateCardData({ x: 6, y: 6 }))
  }, [])

  useEffect(() => {
    if (score === 18) {
      setIsGameCompleted(true)
    }
    const interval = setInterval(() => {
      if (!isGameCompleted && moves > 0) {
        setTimer(prevTimer => prevTimer + 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isGameCompleted, moves, score])

  return (
    <div className="container justify-center items-center ">
      <div className="flex flex-wrap justify-around items-center my-5 mx-auto max-w-md">
        <ViewBoard data={score} title="Score" />
        <ViewBoard data={moves} title="Moves" />
        <ViewBoard data={timer} title="Sec" />
        <div className="flex">
          <button
            class={`bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ${
              isGameCompleted && " opacity-50 cursor-not-allowed"
            }`}
            onClick={handleReset}
            disabled={isGameCompleted}
          >
            {moves === 0 ? "shuffle" : "Reset"}
          </button>
        </div>
      </div>
      <div className="container max-w-md m-5 mx-auto px-4 py-8 border-2 ">
        {isGameCompleted ? (
          <div className="text-center ">
            <h2>Congratulations! You have won the game!</h2>
            <h2>
              Your total moves are {moves} in {timer} seconds
            </h2>
            <button
              class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-5"
              onClick={() => {
                handleReset()
                setIsGameCompleted(false)
              }}
            >
              Restart
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-6 grid-rows-6 gap-1 max-h-[60vh]">
            {cardData.map((data, index) => (
              <motion.div
                key={index}
                className="relative aspect-w-1 aspect-h-1 shadow-2xl"
                style={{
                  padding: "2px",
                  width: "100%",
                  height: "calc(60vh / 6 - 4px)",
                }}
              >
                <motion.div
                  className={`w-full h-full bg-blue-500 rounded-lg shadow-md absolute flex justify-center items-center text-3xl overflow-hidden ${
                    data.isFlipped ? "" : "pointer-events-none"
                  }`}
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: data.isFlipped ? 0 : 180 }}
                  transition={{ duration: 0.5 }}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="p-5">{data.data}</div>
                </motion.div>
                <motion.div
                  className={`w-full h-full bg-green-500 rounded-lg shadow-md absolute flex justify-center items-center ${
                    data.isFlipped ? "pointer-events-none" : ""
                  }`}
                  onClick={() => !stopClick && handleClick(data, index)}
                  initial={{ rotateY: 180 }}
                  animate={{ rotateY: data.isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* {data.data} */}
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FlipCard

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const generateCardData = value => {
  const totalCards = value.x * value.y
  const array = []
  for (let i = 0; i < totalCards / 2; i++) {
    const data = { data: i + 1, isFlipped: false }
    array.push(data, { ...data, data: i + 1 })
  }
  array.sort(() => Math.random() - 0.5)
  return array
}

const ViewBoard = ({ data, title }) => {
  return (
    <div className="flex border-2 p-1">
      <h1 className="text-xl pr-2">{data}</h1>
      <span class="text-xl font-medium text-gray-900">{title}</span>
    </div>
  )
}
