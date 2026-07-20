import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MagneticButton from "./MagneticButton"
import SectionIndex from "./SectionIndex"

const copy = {
  professional: [
    "I operate at the intersection of secure architecture and business scalability. Every interface I ship is threat-modeled before it is styled, and every system I design assumes it will be attacked on day one.",
    "My work spans hardened frontend engineering, penetration-tested infrastructure, and growth systems built on measurable conversion data. Security is not a feature I add at the end. It is the foundation the product stands on."
  ],
  casual: [
    "I am the person who breaks systems for fun and then writes a very polite report about it. Give me a login form and I will spend an hour trying to make it cry.",
    "Most days you will find me deep in a lab environment, lo-fi on loop, coffee well past a reasonable dose, reverse-engineering something that absolutely did not ask for it. Tech is the hobby that got wildly out of hand."
  ]
}

const fade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: "easeIn" } }
}

export default function Manifesto() {
  const [mode, setMode] = useState("professional")

  return (
    <motion.section
      id="manifesto"
      className="manifesto"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="manifesto-visual">
        <div className="blueprint">
          <div className="blueprint-axis blueprint-axis-h" />
          <div className="blueprint-axis blueprint-axis-v" />
          <span className="blueprint-tick blueprint-tick-tl">00.00</span>
          <span className="blueprint-tick blueprint-tick-tr">01.00</span>
          <span className="blueprint-tick blueprint-tick-bl">00.01</span>
          <span className="blueprint-tick blueprint-tick-br">01.01</span>
          <span className="blueprint-crosshair" />
          <span className="blueprint-label">/ about_me</span>
        </div>
      </div>
      <div className="manifesto-text">
        <SectionIndex>02. About Me</SectionIndex>
        <div className="manifesto-tabs">
          <MagneticButton
            className={`tab ${mode === "professional" ? "tab-active" : ""}`}
            onClick={() => setMode("professional")}
          >
            [ Professional ]
          </MagneticButton>
          <MagneticButton
            className={`tab ${mode === "casual" ? "tab-active" : ""}`}
            onClick={() => setMode("casual")}
          >
            [ Casual ]
          </MagneticButton>
        </div>
        <motion.div className="manifesto-copy" layout transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div key={mode} {...fade}>
              {copy[mode].map((p, i) => (
                <p className="manifesto-para" key={i}>
                  {p}
                </p>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  )
}
