// src/services/roll.api.js
const API_BASE = import.meta.env.VITE_API_BASE || "https://api.terminalroll.com";

const token = localStorage.getItem("sessionToken");

export async function rollBitFlip({ walletAddress, betLamports }) {
  const res = await fetch(`${API_BASE}/rolls/paid`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ walletAddress, betLamports })
  });

  let data = null;
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    const msg =
      (data && (data.error || data.message)) ||
      `Roll failed (${res.status})`;
    throw new Error(msg);
  }

  return data;
}

/* =========================
   GAME 2 - CACHE HUNT
========================= */
export async function rollCacheHunt({ walletAddress, betLamports }) {
    const res = await fetch(`${API_BASE}/api/cache-rolls/paid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            walletAddress,
            betLamports
        })
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data?.error || "cache roll failed")
    }

    return data
}

/* =========================
   GAME 3 - PUMP LOOP
========================= */

export async function rollPumpLoop({ walletAddress, betLamports }) {
  const res = await fetch(`${API_BASE}/pump-loop/paid`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
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
      `Pump failed (${res.status})`;
    throw new Error(msg);
  }

  return data;
}