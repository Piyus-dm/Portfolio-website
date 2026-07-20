import { useState } from "react"
import { motion } from "framer-motion"

function toBase64(value) {
  if (!value) return ""
  try {
    return btoa(unescape(encodeURIComponent(value)))
  } catch {
    return ""
  }
}

function toHex(value) {
  return Array.from(value)
    .map((char) => char.codePointAt(0).toString(16).padStart(2, "0"))
    .join(" ")
}

function toCaesar(value, shift) {
  return Array.from(value)
    .map((char) => {
      const code = char.charCodeAt(0)
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26) + 65)
      }
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift) % 26) + 97)
      }
      return char
    })
    .join("")
}

const readoutMotion = {
  initial: { opacity: 0.2, y: 4 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.18 }
}

export default function CryptoVault() {
  const [value, setValue] = useState("")
  const [shift, setShift] = useState(13)

  const base64 = toBase64(value)
  const hex = toHex(value)
  const caesar = toCaesar(value, shift)

  return (
    <div className="vault-card">
      <div className="vault-header">
        <span className="vault-title">crypto_vault.js</span>
        <span className="vault-status">{value ? "ENCODING" : "IDLE"}</span>
      </div>
      <input
        className="vault-input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter plaintext..."
        maxLength={120}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
      <div className="vault-readouts">
        <div className="vault-row">
          <span className="vault-label">BASE64</span>
          <motion.span className="vault-value" key={`b64-${base64}`} {...readoutMotion}>
            {base64 || "·"}
          </motion.span>
        </div>
        <div className="vault-row">
          <span className="vault-label">HEX</span>
          <motion.span className="vault-value" key={`hex-${hex}`} {...readoutMotion}>
            {hex || "·"}
          </motion.span>
        </div>
        <div className="vault-row">
          <div className="vault-label vault-label-shift">
            <span>CAESAR</span>
            <input
              className="vault-shift"
              type="range"
              min="1"
              max="25"
              value={shift}
              onChange={(e) => setShift(Number(e.target.value))}
            />
            <span className="vault-shift-value">{shift}</span>
          </div>
          <motion.span className="vault-value" key={`caesar-${caesar}`} {...readoutMotion}>
            {caesar || "·"}
          </motion.span>
        </div>
      </div>
    </div>
  )
}
