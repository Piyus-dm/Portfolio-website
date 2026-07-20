import { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function MagneticButton({ children, className = "", strength = 0.35, ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const handleMove = (e) => {
    const bounds = ref.current.getBoundingClientRect()
    x.set((e.clientX - bounds.left - bounds.width / 2) * strength)
    y.set((e.clientY - bounds.top - bounds.height / 2) * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </motion.button>
  )
}
