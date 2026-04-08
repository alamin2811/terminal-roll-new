// src/hooks/useSystemFeed.js
import { useEffect, useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://api.terminalroll.com";

export default function useSystemFeed({
  limit = 50,
  maxLines = 6,
} = {}) {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    let alive = true;
    let es;

    fetch(`${API_BASE}/system/feed/recent?limit=${limit}`)
      .then(r => r.json())
      .then(d => {
        if (!alive) return;
        setLines(d.events.map(e => e.line).slice(-maxLines));
      })
      .catch(() => {});

    es = new EventSource(
      `${API_BASE}/system/feed/stream?limit=${limit}`
    );

    es.addEventListener("line", ev => {
      const { line } = JSON.parse(ev.data);
      setLines(l => [...l, line].slice(-maxLines));
    });

    es.onerror = () => {
      es.close();
    };

    return () => {
      alive = false;
      es?.close();
    };
  }, [limit, maxLines]);

  return lines;
}
