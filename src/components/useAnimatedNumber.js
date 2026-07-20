import { useEffect, useRef, useState } from "react"
import { animate } from "framer-motion"

export default function useAnimatedNumber(value, duration = 0.5) {
  const [display, setDisplay] = useState(value)
  const displayRef = useRef(value)

  useEffect(() => {
    const controls = animate(displayRef.current, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        displayRef.current = v
        setDisplay(v)
      }
    })
    return () => controls.stop()
  }, [value, duration])

  return display
}
