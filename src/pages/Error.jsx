import React from "react"
import { Link } from "react-router-dom"

export default function Error() {
  return (
    <div>
      <div>
        <center className="m-5">
          <h1 style={{ fontSize: "10vw" }}> OoPs!!</h1>
          <h1 style={{ fontSize: "2vw" }}>404 Not Found</h1>
          <p>
            THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED <br /> HAD ITS
            NAME CHANGED OR IS TEMPORARILY UNAVAILABLE.
          </p>
          <Link to="/">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
              Back to Home
            </button>
          </Link>
        </center>
      </div>
    </div>
  )
}
