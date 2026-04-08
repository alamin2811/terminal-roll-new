import React, { useEffect, useRef } from "react"
import Terminal from "../Terminal/Terminal"
import SystemConsoleStyle from "./SystemConsole.style"

const SystemConsole = ({ lines }) => {
  const wrapperRef = useRef(null)

  useEffect(() => {
    if (!wrapperRef.current) return

    const terminal = wrapperRef.current.querySelector(".terminal-inner")
    if (!terminal) return

    terminal.scrollTop = terminal.scrollHeight
  }, [lines])

  return (
    <SystemConsoleStyle ref={wrapperRef}>
      <div className="free-roll-terminal-bottom">
        <div className="custom-container">
          <div className="free-roll-terminal-content">
            <Terminal lines={lines} />
          </div>
        </div>
      </div>
    </SystemConsoleStyle>
  )
}

export default SystemConsole
