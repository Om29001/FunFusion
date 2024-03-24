// CoinFlipper.js

import React, { useState } from "react"
import { motion } from "framer-motion"

const CoinFlipper = () => {
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipResult, setFlipResult] = useState("Head")

  const flipCoin = () => {
    setIsFlipping(true)
    setFlipResult(null)

    // Play the sound
    const audio = new Audio("coin_flip.mp3")
    audio.play()

    // Simulate the flip result after a delay
    setTimeout(() => {
      const result = Math.random() < 0.5 ? "Head" : "Tail"
      setFlipResult(result)
      setIsFlipping(false)
    }, 1000) // Adjust the duration based on your animation time
  }

  return (
    <div className="container max-w-md m-5 mx-auto px-4 py-8 ">
      <div className="flex flex-wrap justify-around items-center my-5 mx-auto max-w-lg">
        <motion.div
          animate={{
            rotateX: isFlipping ? 1080 : 0,
          }}
          transition={{ duration: 1 }}
          className="w-20 md:w-32 lg:w-52 h-20 md:h-32 lg:h-52 bg-orange-400 rounded-full outline-4 outline-dashed relative outline-white -outline-offset-[10px] md:outline-4 md:-outline-offset-[10px]"
          onClick={flipCoin}
          disabled={isFlipping}
        >
          <div className="flex text-white justify-center items-center w-full h-full text-xl md:text-2xl lg:text-3xl">
            {flipResult}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CoinFlipper
