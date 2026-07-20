import { useEffect, useRef, useState } from "react"

const BREACH_SEQUENCE = [
  { text: "Injecting crafted payload...", tone: "default" },
  { text: "Overflowing return address 0x7ffeeb2c...", tone: "default" },
  { text: "Redirecting execution flow...", tone: "default" },
  { text: "Spawning remote shell...", tone: "default" },
  { text: "ACCESS GRANTED", tone: "success" }
]

function randomPort() {
  return Math.floor(1024 + Math.random() * 8975)
}

export default function TerminalBreach() {
  const [phase, setPhase] = useState("idle")
  const [ports, setPorts] = useState([])
  const [vulnerableIndex, setVulnerableIndex] = useState(-1)
  const [logs, setLogs] = useState([
    { text: "Firewall active. Awaiting command.", tone: "default" }
  ])
  const logRef = useRef(null)
  const timeouts = useRef([])

  useEffect(() => {
    return () => {
      timeouts.current.forEach(clearTimeout)
    }
  }, [])

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [logs])

  const pushLog = (text, tone = "default") => {
    setLogs((prev) => [...prev, { text, tone }])
  }

  const runScan = () => {
    setPhase("scanning")
    pushLog("> run port_scan")
    pushLog("Scanning target range...")
    const t = setTimeout(() => {
      const generated = [randomPort(), randomPort(), randomPort()]
      setPorts(generated)
      setVulnerableIndex(Math.floor(Math.random() * 3))
      pushLog(`3 open ports detected: ${generated.join(", ")}`)
      setPhase("revealed")
    }, 900)
    timeouts.current.push(t)
  }

  const attemptPort = (port, index) => {
    if (phase !== "revealed") return
    if (index === vulnerableIndex) {
      setPhase("breaching")
      pushLog(`> exploit --port ${port}`)
      BREACH_SEQUENCE.forEach((line, i) => {
        const t = setTimeout(() => {
          pushLog(line.text, line.tone)
          if (i === BREACH_SEQUENCE.length - 1) {
            setPhase("breached")
          }
        }, 480 * (i + 1))
        timeouts.current.push(t)
      })
    } else {
      pushLog(`Connection refused on port ${port} // Filtered`, "error")
    }
  }

  const reset = () => {
    timeouts.current.forEach(clearTimeout)
    timeouts.current = []
    setPhase("idle")
    setPorts([])
    setVulnerableIndex(-1)
    setLogs([{ text: "Firewall active. Awaiting command.", tone: "default" }])
  }

  return (
    <div className="terminal-card">
      <div className="terminal-header">
        <span className="terminal-dot terminal-dot-red" />
        <span className="terminal-dot terminal-dot-yellow" />
        <span className="terminal-dot terminal-dot-green" />
        <span className="terminal-title">terminal_breach.sh</span>
      </div>
      <div className="terminal-body" ref={logRef}>
        {logs.map((line, i) => (
          <p className={`terminal-line terminal-line-${line.tone}`} key={i}>
            {line.text}
          </p>
        ))}
        <span className="terminal-cursor" />
      </div>
      <div className="terminal-controls">
        {phase === "idle" && (
          <button className="terminal-btn" onClick={runScan}>
            Run Port Scan
          </button>
        )}
        {phase === "revealed" && (
          <div className="terminal-ports">
            {ports.map((port, i) => (
              <button
                className="terminal-port"
                key={`${port}-${i}`}
                onClick={() => attemptPort(port, i)}
              >
                {port}
              </button>
            ))}
          </div>
        )}
        {phase !== "idle" && (
          <button className="terminal-btn terminal-btn-ghost" onClick={reset}>
            Reset
          </button>
        )}
      </div>
    </div>
  )
}
