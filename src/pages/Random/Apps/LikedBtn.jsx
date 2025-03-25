import { useState } from "react"

const LikedBtn = () => {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(100) // Example: Start with 100 likes

  const toggleLike = () => {
    setLiked(prevLiked => !prevLiked)
    setLikeCount(prevCount => (liked ? prevCount - 1 : prevCount + 1))
  }

  return (
    <div className="flex">
      <button onClick={toggleLike}>
        <svg
          className="overflow-hidden"
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z"
            fillRule="nonzero"
            fill={liked ? "red" : "gray"}
          />
        </svg>
        ({likeCount})
      </button>
    </div>
  )
}

export default LikedBtn
