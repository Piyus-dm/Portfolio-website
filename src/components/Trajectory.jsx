import { useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import SectionIndex from "./SectionIndex"

const nodes = [
  {
    era: "Past",
    text: "Learned the fundamentals of computer science, explored a range of programming languages, and studied digital marketing."
  },
  {
    era: "Present · 2026 Core Focus",
    text: "Studying cybersecurity full time, going deep on offensive fundamentals and defensive system design."
  },
  {
    era: "Future",
    text: "Becoming a cloud security engineer, securing distributed infrastructure at scale."
  }
]

export default function Trajectory() {
  const trackRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.5"]
  })
  const lineScale = useSpring(scrollYProgress, { stiffness: 100, damping: 20 })

  return (
    <section className="trajectory">
      <SectionIndex>04. Trajectory</SectionIndex>
      <div className="timeline" ref={trackRef}>
        <div className="timeline-rail">
          <motion.div className="timeline-progress" style={{ scaleY: lineScale }} />
        </div>
        {nodes.map((node, i) => (
          <motion.div
            className="timeline-node"
            key={node.era}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.08 }}
          >
            <span className="timeline-dot" />
            <h3 className="timeline-era">{node.era}</h3>
            <p className="timeline-text">{node.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
