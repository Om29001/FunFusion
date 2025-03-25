import Counter from "./Apps/Counter"
import HolyGrail from "./Apps/HolyGrail"
import LikedBtn from "./Apps/LikedBtn"
import StopWatch from "./Apps/StopWatch"

function Random() {
  return (
    <>
      <div className="flex w-full m-5 gap-2">
        <Counter />
        <StopWatch />
        <LikedBtn />
      </div>
      <HolyGrail />
    </>
  )
}

export default Random
