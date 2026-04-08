const API_BASE = import.meta.env.VITE_API_BASE || "https://api.terminalroll.com";

function getToken() {
  return localStorage.getItem("sessionToken");
}

export async function startBeatBomb({ walletAddress, betLamports }) {
  const res = await fetch(`${API_BASE}/beat-bomb/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ walletAddress, betLamports })
  });

  let data = null;
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    const msg =
      (data && (data.error || data.message)) ||
      `Beat the Bomb start failed (${res.status})`;
    throw new Error(msg);
  }

  return data;
}

export function openBeatBombStream({ roundId, walletAddress }) {
  const url = new URL(`${API_BASE}/beat-bomb/stream/${roundId}`);
  url.searchParams.set("walletAddress", walletAddress);
  return new EventSource(url.toString(), { withCredentials: false });
}

export async function cashoutBeatBomb({ walletAddress, roundId }) {
  const res = await fetch(`${API_BASE}/beat-bomb/cashout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ walletAddress, roundId })
  });

  let data = null;
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    const msg =
      (data && (data.error || data.message)) ||
      `Beat the Bomb cashout failed (${res.status})`;
    throw new Error(msg);
  }

  return data;
}