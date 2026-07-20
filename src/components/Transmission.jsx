import { motion } from "framer-motion"

const links = [
  { label: "[ LinkedIn ]", href: "https://www.linkedin.com/in/piyus-khatri-0973a5329/" },
  { label: "[ GitHub ]", href: "https://github.com/Piyus-dm" },
  { label: "[ Email ]", href: "mailto:khatripiyus95@gmail.com" }
]

export default function Transmission() {
  return (
    <motion.footer
      className="transmission"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="transmission-headline">
        Looking for a secure developer or a growth strategist? Let&rsquo;s talk.
      </h2>
      <nav className="transmission-links">
        {links.map((link) => (
          <a
            className="transmission-link"
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <p className="transmission-footnote">
        [ Node: PK // Status: Authenticated // Epoch: 2026 ]
      </p>
    </motion.footer>
  )
}
