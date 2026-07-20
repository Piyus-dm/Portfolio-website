import { useMemo, useState } from "react"
import { motion } from "framer-motion"

function estimateCharsetSize(password) {
  let size = 0
  if (/[a-z]/.test(password)) size += 26
  if (/[A-Z]/.test(password)) size += 26
  if (/[0-9]/.test(password)) size += 10
  if (/[^a-zA-Z0-9]/.test(password)) size += 32
  return size
}

const PLURAL_OVERRIDES = {
  century: "centuries"
}

function formatDuration(seconds) {
  if (!isFinite(seconds) || seconds <= 1) return "instantly"
  const units = [
    ["century", 60 * 60 * 24 * 365 * 100],
    ["year", 60 * 60 * 24 * 365],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
    ["second", 1]
  ]
  for (const [label, unitSeconds] of units) {
    if (seconds >= unitSeconds) {
      const count = seconds / unitSeconds
      const rounded = count >= 100 ? Math.round(count).toLocaleString() : count.toFixed(1)
      const plural = PLURAL_OVERRIDES[label] || `${label}s`
      return `${rounded} ${count >= 2 ? plural : label}`
    }
  }
  return "instantly"
}

const COMMON_PASSWORDS = [
  "password",
  "123456",
  "12345678",
  "qwerty",
  "letmein",
  "admin",
  "welcome",
  "iloveyou",
  "abc123",
  "111111",
  "monkey",
  "dragon"
]

function isCommonPassword(password) {
  const lower = password.toLowerCase()
  return COMMON_PASSWORDS.some((common) => lower.includes(common))
}

function classify(entropy, password) {
  if (password && isCommonPassword(password)) return { label: "Weak", tone: "weak" }
  if (entropy < 28) return { label: "Weak", tone: "weak" }
  if (entropy < 36) return { label: "Fair", tone: "fair" }
  if (entropy < 60) return { label: "Good", tone: "good" }
  if (entropy < 100) return { label: "Strong", tone: "strong" }
  return { label: "Vault Grade", tone: "vault" }
}

export default function PasswordEntropy() {
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState(false)

  const { entropy, onlineTime, offlineTime, strength } = useMemo(() => {
    const charset = estimateCharsetSize(password)
    const rawBits = password.length && charset ? password.length * Math.log2(charset) : 0
    const common = isCommonPassword(password)
    const bits = common ? Math.min(rawBits, 8) : rawBits
    const combinations = Math.pow(2, bits)
    return {
      entropy: rawBits,
      onlineTime: formatDuration(combinations / 2 / 100),
      offlineTime: formatDuration(combinations / 2 / 1e10),
      strength: classify(rawBits, password)
    }
  }, [password])

  const meterWidth = Math.min(100, (entropy / 120) * 100)

  return (
    <div className="entropy-card">
      <div className="entropy-header">
        <span className="entropy-title">entropy_check.js</span>
        <span className={`entropy-status entropy-status-${strength.tone}`}>{strength.label}</span>
      </div>
      <div className="entropy-input-row">
        <input
          className="entropy-input"
          type={visible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Test a password..."
          maxLength={64}
          autoComplete="new-password"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <button className="entropy-toggle" type="button" onClick={() => setVisible((v) => !v)}>
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      <div className="entropy-meter-track">
        <motion.div
          className={`entropy-meter-fill entropy-meter-fill-${strength.tone}`}
          animate={{ width: `${meterWidth}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
      <div className="entropy-stats">
        <div className="entropy-stat">
          <span className="entropy-stat-label">Entropy</span>
          <span className="entropy-stat-value">{entropy.toFixed(1)} bits</span>
        </div>
        <div className="entropy-stat">
          <span className="entropy-stat-label">Online Attack</span>
          <span className="entropy-stat-value">{onlineTime}</span>
        </div>
        <div className="entropy-stat">
          <span className="entropy-stat-label">Offline / GPU</span>
          <span className="entropy-stat-value">{offlineTime}</span>
        </div>
      </div>
      <p className="entropy-note">Computed locally. Nothing is sent or stored.</p>
    </div>
  )
}
