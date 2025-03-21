import { useCallback, useEffect, useState } from "react"

function TextEditor() {
  const [text, setText] = useState("")
  const [processedText, setProcessedText] = useState("")
  const [selectedStyle, setSelectedStyle] = useState(styles)
  const [selectedStyle2, setSelectedStyle2] = useState(styles2)
  const [reverse, setReverse] = useState(false)

  const [count, setCount] = useState({ words: 0, letters: 0, sentences: 0 })
  const process = useCallback(
    data => {
      let processedText = data ?? text
      processedText = reverse ? text.split("").reverse().join("") : text
      processedText = processText(
        processedText,
        selectedStyle2,
        setProcessedText
      )
      setProcessedText(processedText)
    },
    [text, reverse, selectedStyle2]
  )
  const handleChange = e => {
    setText(e.target.value)
    process(e.target.value)
    callCount(setCount, e.target.value)
  }

  useEffect(() => {
    process()
  }, [process, selectedStyle, selectedStyle2, reverse])

  return (
    <div className="block my-auto p-5 justify-center items-center h-full">
      <div className="btnHeader flex flex-wrap mb-5 gap-4 justify-center">
        <div>
          <h6>Styles</h6>
          {Object.keys(styles).map((style, index) => (
            <div className="flex items-center" key={index}>
              <input
                id="default-radio-1"
                type="checkbox"
                name={style}
                onChange={() =>
                  setSelectedStyle(prev => ({
                    ...prev,
                    [style]: {
                      ...prev[style],
                      selected: !prev[style].selected,
                    },
                  }))
                }
                className="w-4 h-400 text-sm"
              />
              <label
                htmlFor="default-radio-1"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {style}
              </label>
            </div>
          ))}
        </div>
        <div>
          <h6>Mis</h6>

          <div className="flex items-center">
            <input
              id="default-radio-1"
              type="checkbox"
              name="reverse"
              checked={reverse}
              className="w-4 h-400 text-sm"
              onChange={() => setReverse(prev => !prev)}
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Reverse
            </label>
          </div>
        </div>
        <div>
          <h6>Styles 2</h6>
          {Object.keys(styles2).map((style, index) => (
            <div className="flex items-center mb-4" key={index}>
              <input
                id={`radio-style2-${index}`}
                type="radio"
                name="style2"
                checked={selectedStyle2[style].selected}
                onChange={() =>
                  setSelectedStyle2(
                    Object.keys(styles2).reduce((acc, key) => {
                      acc[key] = {
                        ...styles2[key],
                        selected: key === style,
                      }
                      return acc
                    }, {})
                  )
                }
                className="w-4 h-4 text-sm"
              />
              <label
                htmlFor={`radio-style2-${index}`}
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {style}
              </label>
            </div>
          ))}
        </div>
      </div>

      <textarea
        id="message"
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-300 rounded-lg border border-gray-300dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500 mb-4 "
        placeholder="Write your thoughts here..."
        value={text}
        onChange={handleChange}
      />

      <textarea
        id="message"
        rows="4"
        disabled
        className={`block ${
          selectedStyle.underline.selected ? "underline" : ""
        } ${selectedStyle.bold.selected ? "font-bold" : ""} ${
          selectedStyle.italic.selected ? "italic" : ""
        } p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
        placeholder="Write your thoughts above and see here..."
        value={processedText}
      />
      <span className="text-sm text-gray-400">{`Counts : { Words : ${count.words} Letters : ${count.letters} Sentences : ${count.sentences} }`}</span>
    </div>
  )
}

export default TextEditor

const styles = {
  italic: {
    label: "Italic",
    selected: false,
  },
  bold: {
    label: "Bold",
    selected: false,
  },
  underline: {
    label: "Underline",
    value: "underline",
    selected: false,
  },
}
const styles2 = {
  uppercase: {
    label: "Uppercase",
    selected: false,
    todo: input => input.toUpperCase(),
  },
  lowercase: {
    label: "Lowercase",
    selected: false,
    todo: input => input.toLowerCase(),
  },
  capitalize: {
    label: "Capitalize",
    selected: false,
    todo: input => input.replace(/\b\w/g, char => char.toUpperCase()), // Capitalizes each word
  },
}
const processText = (text, selectedStyle2) => {
  let processedText = text

  Object.keys(selectedStyle2).forEach(style => {
    if (selectedStyle2[style].selected) {
      console.log(selectedStyle2[style])
      processedText = selectedStyle2[style].todo(text)
    }
  })
  return processedText
}

const callCount = (setCount, text) => {
  const words =
    text === "" ? 0 : text.replace(/\s+/g, " ").trim().split(" ").length
  const letters = text.replace(/[ \ng]/g, "").length
  const sentences = text.split(".").length - 1
  return setCount({ words, letters, sentences })
}
