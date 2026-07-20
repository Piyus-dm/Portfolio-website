import { motion } from "framer-motion"
import SectionIndex from "./SectionIndex"
import TerminalBreach from "./TerminalBreach"
import CryptoVault from "./CryptoVault"
import FunnelSimulator from "./FunnelSimulator"
import PasswordEntropy from "./PasswordEntropy"

export default function Playground() {
  return (
    <section className="playground">
      <SectionIndex>05. My Playground / Micro-Experiments</SectionIndex>
      <motion.div
        className="playground-grid"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="playground-cell playground-cell-wide">
          <TerminalBreach />
        </div>
        <div className="playground-cell">
          <CryptoVault />
        </div>
        <div className="playground-cell playground-cell-wide">
          <FunnelSimulator />
        </div>
        <div className="playground-cell">
          <PasswordEntropy />
        </div>
      </motion.div>
    </section>
  )
}
