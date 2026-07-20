import { Fragment } from "react"
import { motion } from "framer-motion"
import MagneticButton from "./MagneticButton"

const headline = "I build secure digital products that scale businesses."

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
}

const word = {
  hidden: { opacity: 0, y: "0.6em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
}

export default function Hero() {
  const scrollToManifesto = () => {
    document.getElementById("manifesto")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="hero">
      <motion.h1
        className="hero-headline"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {headline.split(" ").map((w, i) => (
          <Fragment key={i}>
            <span className="hero-word-mask">
              <motion.span className="hero-word" variants={word}>
                {w}
              </motion.span>
            </span>{" "}
          </Fragment>
        ))}
      </motion.h1>
      <motion.p
        className="hero-sub"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
      >
        Cybersecurity Student. Web Developer. Digital Marketer. Growth Strategist.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <MagneticButton className="hero-cta" onClick={scrollToManifesto}>
          [ Explore Mindset ]
        </MagneticButton>
      </motion.div>
    </section>
  )
}
