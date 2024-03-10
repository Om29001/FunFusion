import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

function FlipCard() {
  const [cardData, setCardData] = useState([])
  const [score, setScore] = useState(0)
  const [count, setCount] = useState(0)
  const [stopClick, setStopClick] = useState(false)

  const prevCardData = useRef(null)

  useEffect(() => {
    setCardData(generateCardData({ x: 6, y: 6 }))
  }, [])
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

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

  const handleClick = async (card, index) => {
    setStopClick(true)
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

  return (
    <div className="container justify-center items-center ">
      <div className="flex justify-center items-center my-5 mx-auto max-w-md">
        <h1 className="text-2xl pr-2">{score}</h1>
        <span class="text-2xl font-medium text-gray-900">Score</span>
      </div>
      <div className="container max-w-md m-5 mx-auto px-4 py-8 border-2 ">
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
              ></motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FlipCard

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
