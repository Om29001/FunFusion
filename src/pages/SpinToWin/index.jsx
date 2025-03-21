import { motion } from "framer-motion"
import { useState } from "react"

const SpinToWin = () => {
  const segments = 20 // Number of segments
  const segmentAngle = 360 / segments // Angle of each segment

  const [angle, setAngle] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    const newAngle = Math.floor(Math.random() * 360) + 3600
    setAngle(prevAngle => prevAngle + newAngle)

    setTimeout(() => {
      setIsSpinning(false)
    }, 2000)
  }

  const generateColor = () => {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
  return (
    <div
      className="flex items-center w-full min-h-min my-5 relative justify-around flex-wrap
    "
    >
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-black"></div>
      </div>
      <div className="relative">
        <motion.div
          animate={{ rotate: angle }}
          transition={{ type: "spring", stiffness: 50, damping: 10 }}
        >
          <svg className="w-60 h-60 sm:w-80 sm:h-80" viewBox="0 0 100 100">
            {Array.from({ length: segments }).map((_, i) => (
              <path
                key={i}
                d={`
                  M 50 50
                  L ${50 + 50 * Math.cos((i * segmentAngle * Math.PI) / 180)} 
                    ${50 + 50 * Math.sin((i * segmentAngle * Math.PI) / 180)}
                  A 50 50 0 0 1 
                    ${
                      50 +
                      50 * Math.cos(((i + 1) * segmentAngle * Math.PI) / 180)
                    } 
                    ${
                      50 +
                      50 * Math.sin(((i + 1) * segmentAngle * Math.PI) / 180)
                    }
                  Z
                `}
                fill={generateColor()}
                stroke="white"
                strokeWidth="0.5"
              />
            ))}
          </svg>
        </motion.div>
        <div
          onClick={spinWheel}
          className="bg-[#3d8521] w-20 h-20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <h4 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold">
            Spin
          </h4>
        </div>
      </div>
      <div>
        <h1>other half</h1>
      </div>
    </div>
  )
}

export default SpinToWin
