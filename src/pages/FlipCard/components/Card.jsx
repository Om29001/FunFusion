import { motion } from "framer-motion"

function Card({ data, handleClick }) {
  return (
    <div className=" w-24 h-24 relative ">
      <motion.div
        className={` aspect-w-1 aspect-h-1 bg-blue-500 rounded-lg shadow-md absolute flex justify-center items-center text-3xl ${
          data.isFlipped ? "" : "pointer-events-none"
        } overflow-hidden`}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: data.isFlipped ? 0 : 180 }}
        transition={{ duration: 0.5 }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <div>{data.data}</div>
      </motion.div>
      <motion.div
        className={` aspect-w-1 aspect-h-1 bg-green-500 rounded-lg shadow-md absolute flex justify-center items-center  ${
          data.isFlipped ? "pointer-events-none" : ""
        }`}
        onClick={handleClick}
        initial={{ rotateY: 180 }}
        animate={{ rotateY: data.isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <div>F</div>
      </motion.div>
    </div>
  )
}

export default Card
