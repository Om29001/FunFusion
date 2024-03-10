import React from "react"

function Footer() {
  return (
    <footer className="text-gray-900 body-font bg-orange-400 mt-10">
      <hr />
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <p className="text-smsm:ml-4 sm:pr-4 sm:border-r-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2024 Om Surti —
          <a
            href="https://www.linkedin.com/in/om-surti-a6800b1b4/"
            className=" ml-1 hover:text-gray-600"
            rel="noopener noreferrer"
            target="_blank"
          >
            @Om Surti
          </a>
        </p>
        <a
          href="https://omsurti.netlify.app/#/"
          className=" ml-1 pl-2 hover:text-gray-600"
          rel="noopener noreferrer"
          target="_blank"
        >
          portfolio
        </a>
      </div>
    </footer>
  )
}

export default Footer
