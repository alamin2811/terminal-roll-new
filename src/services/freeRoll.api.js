// src/services/freeRoll.api.js
const API_BASE = import.meta.env.VITE_API_BASE || "https://api.terminalroll.com";

export async function rollFreeRoll({ walletAddress }) {
  const token = localStorage.getItem("sessionToken");
  if (!token) throw new Error("not authenticated");

  const res = await fetch(`${API_BASE}/freerolls/${walletAddress}/consume`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ walletAddress })
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

export async function getFreeRolls({ walletAddress }) {
  const token = localStorage.getItem("sessionToken");
  if (!token) throw new Error("not authenticated");

  const res = await fetch(`${API_BASE}/freerolls/${walletAddress}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`,}
  });

  let data = null;
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    const msg =
      (data && (data.error || data.message)) ||
      `Get free rolls failed (${res.status})`;
    throw new Error(msg);
  }

  return data;
}