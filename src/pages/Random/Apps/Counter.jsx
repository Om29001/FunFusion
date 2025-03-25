import { useState } from "react"

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="block ">
      <div className="text-sm my-2">Counter : {count}</div>
      <button
        className="cursor-pointer border-2 text-2xl border-black  px-2 mr-2"
        onClick={() => setCount(p => p + 1)}
      >
        +
      </button>
      <button
        className="cursor-pointer border-2 border-black px-2 text-2xl"
        onClick={() => setCount(p => p - 1)}
      >
        -
      </button>
    </div>
  )
}

export default Counter
