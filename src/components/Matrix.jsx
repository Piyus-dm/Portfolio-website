import { motion } from "framer-motion"
import SectionIndex from "./SectionIndex"

const pillars = [
  {
    code: "01",
    title: "Defend",
    items: ["Cybersecurity", "Penetration Testing", "OWASP Top 10", "Lab Environments"]
  },
  {
    code: "02",
    title: "Build",
    items: ["React Architecture", "Core JS", "Secure Frontend", "Interface Design"]
  },
  {
    code: "03",
    title: "Amplify",
    items: ["Conversion Optimization", "SEO Strategy", "Technical Growth", "Funnel Data"]
  },
  {
    code: "04",
    title: "Scale",
    items: ["Market Realignment", "Client Acquisition", "Business Flow", "System Logic"]
  }
]

const interests = ["Gaming", "Photography", "Anime", "Lo-Fi"]

const grid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

const card = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
}

export default function Matrix() {
  return (
    <section className="matrix">
      <SectionIndex>03. My Creative Playground</SectionIndex>
      <motion.div
        className="matrix-grid"
        variants={grid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {pillars.map((pillar) => (
          <motion.div
            className="matrix-card"
            key={pillar.code}
            variants={card}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <span className="matrix-code">{pillar.code}</span>
            <h3 className="matrix-title">{pillar.title}</h3>
            <ul className="matrix-list">
              {pillar.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="matrix-badges"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        {interests.map((interest) => (
          <span className="badge" key={interest}>
            {interest}
          </span>
        ))}
      </motion.div>
    </section>
  )
}
