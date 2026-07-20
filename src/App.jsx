import { useEffect, useState } from "react"
import Hero from "./components/Hero"
import Manifesto from "./components/Manifesto"
import Matrix from "./components/Matrix"
import Trajectory from "./components/Trajectory"
import Playground from "./components/Playground"
import Transmission from "./components/Transmission"
import MagneticButton from "./components/MagneticButton"

export default function App() {
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <div className="app">
      <header className="topbar">
        <MagneticButton
          className="topbar-mark"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          PK.
        </MagneticButton>
        <MagneticButton
          className="theme-toggle"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "[ Light ]" : "[ Dark ]"}
        </MagneticButton>
      </header>
      <main>
        <Hero />
        <Manifesto />
        <Matrix />
        <Trajectory />
        <Playground />
        <Transmission />
      </main>
    </div>
  )
}
