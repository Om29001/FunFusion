import React, { useState, useEffect } from "react"
import ConfirmationBox from "./components/Confirmation"
import ValueDialog from "./components/ValueDialog"
import Cursor from "./components/Cursors"

function Calculator() {
  const [expression, setExpression] = useState("")
  const [showValueConfirmation, setShowValueConfirmation] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showPaidConfirmation, setShowPaidConfirmation] = useState(false)
  const [showFeeConfirmation, setShowFeeConfirmation] = useState(false)

  const [ans, setAns] = useState()
  const [freeTrialUses, setFreeTrialUses] = useState(1) // Initial free trial uses

  useEffect(() => {
    // Load remaining free trial uses from local storage
    const remainingUses = localStorage.getItem("remainingUses")
    if (remainingUses) {
      setFreeTrialUses(parseInt(remainingUses))
    }
  }, [])

  const handleClick = value => {
    setExpression(prev => prev + value)
  }

  const clearExpression = () => {
    setExpression("")
  }

  const handleValueConfirmation = value => {
    setAns(value)
    setShowValueConfirmation(false)
    setShowConfirmation(true)
  }

  const handleConfirmPaid = () => {
    setFreeTrialUses(prev => prev - 1)
    localStorage.setItem("remainingUses", freeTrialUses - 1)
    setShowPaidConfirmation(false)
    setShowValueConfirmation(true)
  }
  const handleCal = btn => {
    if (btn === "C") return clearExpression()
    if (
      expression &&
      (expression.includes("x") ||
        expression.includes("/") ||
        expression.includes("%"))
    ) {
      if (freeTrialUses > 0) return setShowPaidConfirmation(true)
      else {
        setShowFeeConfirmation(true)
      }
    } else if (expression) {
      setShowValueConfirmation(true)
    }
  }
  const handleBack = () => {
    if (expression && expression.length > 0) {
      setExpression(prev => prev.substring(0, expression.length - 1))
    }
  }
  return (
    <>
      {showFeeConfirmation && <Cursor />}
      {showFeeConfirmation && (
        <ConfirmationBox
          showCursors
          message={`Find the real cursor and add 1 more trail`}
          onConfirm={() => {
            setShowFeeConfirmation(false)
            setShowValueConfirmation(true)
          }}
        />
      )}
      {showConfirmation && (
        <ConfirmationBox
          message={`Are you sure, it is '${ans}'`}
          onConfirm={() => {
            setExpression(ans)
            setShowConfirmation(false)
          }}
          onCancel={() => {
            setShowConfirmation(false)
            setShowValueConfirmation(true)
          }}
        />
      )}
      {showPaidConfirmation && (
        <ConfirmationBox
          message={`This is a paid feature. Do you want to proceed?`}
          showCursors
          onConfirm={handleConfirmPaid}
          onCancel={() => {
            setExpression("")
            setShowPaidConfirmation(false)
          }}
        />
      )}
      {showValueConfirmation && (
        <ValueDialog
          message={`${expression} = `}
          onConfirm={handleValueConfirmation}
          onCancel={() => setShowValueConfirmation(false)}
        />
      )}
      <div className="flex flex-col items-center justify-center h-3/6 mt-10">
        <h1 className="font-serif text-3xl"> Advance Calculator</h1>
        <h4 className="font-serif "> Weird things may occur</h4>

        <div className="border-2 border-blue-300 bg-white p-4 rounded-lg shadow-lg">
          <input
            type="text"
            value={expression}
            className="input mb-2 p-2 text-2xl text-right w-full rounded border-2 border-blue-300"
            readOnly
          />
          <div className="grid grid-cols-4 gap-2">
            {["7", "8", "9", "+"].map(btn => (
              <Btn key={btn} btnContent={btn} handleClick={handleClick} />
            ))}
            {["4", "5", "6", "-"].map(btn => (
              <Btn key={btn} btnContent={btn} handleClick={handleClick} />
            ))}
            {["1", "2", "3", "/"].map(btn => (
              <Btn key={btn} btnContent={btn} handleClick={handleClick} />
            ))}
            {["0", ".", "%", "x"].map(btn => (
              <Btn key={btn} btnContent={btn} handleClick={handleClick} />
            ))}
            {["C", "="].map(btn => (
              <Btn
                key={btn}
                btnContent={btn}
                handleClick={() => handleCal(btn)}
              />
            ))}
            <Btn btnContent={"<"} handleClick={handleBack} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Calculator

const Btn = ({ btnContent, handleClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-full"
      onClick={() => handleClick(btnContent)}
    >
      {btnContent}
    </button>
  )
}
