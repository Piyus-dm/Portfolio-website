import { motion } from "framer-motion"

export default function SectionIndex({ children }) {
  return (
    <div className="section-index-mask">
      <motion.span
        className="section-index"
        initial={{ y: "100%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      >
        {children}
      </motion.span>
    </div>
  )
}
