//src/components/Core/Terminal/Terminal.jsx
import React, { useEffect, useRef, useState } from "react";
import TerminalStyle from "./Terminal.style";

const PROMPT = ">";

const Terminal = ({ lines }) => {
  //const [lines, setLines] = useState([]);
  //const [input, setInput] = useState("");
  //const [history, setHistory] = useState([]);
  //const [historyIndex, setHistoryIndex] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const bodyRef = useRef(null);
  //const inputRef = useRef(null);

  /*useEffect(() => {
    inputRef.current.focus();
  }, []);*/

  const updateOverlay = () => {
    const el = bodyRef.current;
    if (!el) return;
    setShowOverlay(el.scrollHeight > el.clientHeight);
  };

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    el.scrollTop = el.scrollHeight;
    updateOverlay();
  }, [lines]);

  useEffect(() => {
    window.addEventListener("resize", updateOverlay);
    return () => window.removeEventListener("resize", updateOverlay);
  }, []);

  /*const executeCommand = (cmd) => {
    if (!cmd) return null;
    if (cmd === "clear") {
      setLines([]);
      return null;
    }
    if (cmd === "date") return new Date().toString();
    if (cmd.startsWith("echo ")) return cmd.slice(5);
    return `command not found: ${cmd}`;
  };*/

  /*const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const command = input.trim();
      setLines((prev) => [...prev, command]);

      if (command) {
        setHistory((h) => [...h, command]);
        setHistoryIndex(null);
        const output = executeCommand(command);
        if (output !== null) {
          setLines((prev) => [...prev, output]);
        }
      }
      setInput("");
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const index =
        historyIndex === null
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(index);
      setInput(history[index]);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const index = historyIndex + 1;
      if (index >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(index);
        setInput(history[index]);
      }
    }
  };*/

  return (
    /*<TerminalStyle onClick={() => inputRef.current.focus()}>*/
    <TerminalStyle>
      <div className="terminal-inner">
        <div className="terminal-body" ref={bodyRef}>
          {lines.map((line, i) => (
            <div className="terminal-line" key={i}>
              <span className="prompt">{PROMPT}</span>
              <span>{line}</span>
            </div>
          ))}

          {/*<div className="terminal-line">
            <span className="prompt">{PROMPT}</span>
            <div className="input-wrapper">
              <input
                ref={inputRef}
                className="terminal-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
              />
              <span className="cursor" />
            </div>
          </div>*/}
        </div>

        {showOverlay && <div className="terminal-overlay" />}
      </div>
    </TerminalStyle>
  );
};

export default Terminal;
