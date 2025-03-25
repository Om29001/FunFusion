import { useEffect, useState, useCallback } from "react"

function StopWatch() {
  const [value, setValue] = useState(0)
  const [start, setStart] = useState(false)
  const incrementValue = useCallback(() => {
    setValue(p => p + 1)
  }, [])

  useEffect(() => {
    let interval
    if (start) {
      interval = setInterval(incrementValue, 1000)
    }
    return () => clearInterval(interval)
  }, [start, incrementValue])

  return (
    <div className="block ">
      <div className="text-sm my-2">StopWatch : {value}</div>
      <button
        className="cursor-pointer border-2 text-sm border-black  px-2 mr-2"
        onClick={() => {
          setStart(p => !p)
        }}
      >
        {!start ? "Start" : "Pause"}
      </button>
      <button
        className="cursor-pointer border-2 border-black px-2 text-sm"
        onClick={() => setValue(0)}
      >
        reset
      </button>
    </div>
  )
}

export default StopWatch
