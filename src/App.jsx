import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Suspense, lazy } from "react"
import Spinner from "./atoms/Spinner"

const Home = lazy(() => import("./pages/Home"))
const Calculator = lazy(() => import("./pages/Calculator"))
const FlipCard = lazy(() => import("./pages/FlipCard"))
const Error = lazy(() => import("./pages/Error"))

const Header = lazy(() => import("./atoms/Header"))
const Footer = lazy(() => import("./atoms/Footer"))

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Spinner />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/calculator"
          element={
            <Suspense fallback={<Spinner />}>
              <Calculator />
            </Suspense>
          }
        />
        <Route
          path="/memorygame"
          element={
            <Suspense fallback={<Spinner />}>
              <FlipCard />
            </Suspense>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
