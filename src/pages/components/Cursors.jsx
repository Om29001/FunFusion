// Cursor.js
import React from "react"
import { motion } from "framer-motion"
import { PiCursorDuotone } from "react-icons/pi"
import { PiCursorLight } from "react-icons/pi"

const Cursor = () => {
  const cursorStyle = {
    position: "fixed",
    zIndex: 9999,
    pointerEvents: "none",
  }

  const randomPosition = () => ({
    x: `${Math.random() * window.innerWidth}px`,
    y: `${Math.random() * window.innerHeight}px`,
  })

  const cursors = Array.from({ length: 100 }).map((_, index) => (
    <motion.div
      key={index}
      style={{
        ...cursorStyle,
        ...randomPosition(), // Initial random position
      }}
      animate={{
        x: [
          null,
          ...Array.from({ length: 10 }, () => randomPosition().x),
          null,
        ], // Animate to random x positions
        y: [
          null,
          ...Array.from({ length: 10 }, () => randomPosition().y),
          null,
        ], // Animate to random y positions
        transition: {
          duration: Math.random() * 10 + 5, // Random duration for variety
          repeat: Infinity, // Repeat the animation infinitely
          repeatType: "loop", // Loop the animation
        },
      }}
    >
      {/* <PiCursorDuotone tabIndex={-1} className="text-black" /> */}
      <PiCursorLight />
    </motion.div>
  ))

  return <>{cursors}</>
}

export default Cursor
