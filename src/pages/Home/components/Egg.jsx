import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

function FallingEgg({ delay, onCrack, onCatch }) {
  const [cracked, setCracked] = useState(false)

  useEffect(() => {
    if (cracked) {
      const crackTimeout = setTimeout(() => {
        setCracked(false)
        onCrack()
      }, 1500)

      return () => clearTimeout(crackTimeout)
    }
  }, [cracked, onCrack])

  const crackEgg = () => {
    setCracked(true)
    onCatch()
  }

  return (
    <div
      className="absolute"
      style={{ top: -50, left: Math.random() * window.innerWidth - 50 }}
    >
      <div className="relative" onClick={crackEgg}>
        <div>
          {!cracked && (
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 100 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 120,
                delay,
              }}
              className="text-white font-bold text-5xl "
            >
              🥚
            </motion.div>
          )}
          {cracked && (
            <motion.div
              initial={{ scale: 0, y: -100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center text-5xl"
            >
              <div className="bg-white text-2xl font-bold text-gray-800 p-2">
                🐣 Your fact or message here!
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

function FallingEggs({ onScoreChange }) {
  const [eggs, setEggs] = useState([])
  const [score, setScore] = useState(0)

  const addEgg = () => {
    setEggs([...eggs, Date.now()])
  }

  const removeEgg = () => {
    setEggs(eggs.slice(1))
  }

  const handleCatch = () => {
    setScore(score + 1)
    onScoreChange(score + 1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      addEgg()
      if (eggs.length > 5) {
        removeEgg()
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [eggs])

  return (
    <div className="relative ">
      {eggs.map((egg, index) => (
        <FallingEgg
          key={index}
          delay={index * 0.5}
          onCatch={handleCatch}
          onCrack={() => {}}
        />
      ))}
    </div>
  )
}

export default FallingEggs
