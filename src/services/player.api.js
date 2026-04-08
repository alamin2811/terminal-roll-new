// src/services/player.api.js
const API_BASE = import.meta.env.VITE_API_BASE || "https://api.terminalroll.com";

function authHeaders() {
  const token = localStorage.getItem("sessionToken");

  if (!token) {
    window.dispatchEvent(new Event("AUTH_REQUIRED"));
    throw new Error("not authenticated");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}



export async function fetchPlayerByWallet(walletAddress) {
  const res = await fetch(
    `${API_BASE}/players/byWallet/${walletAddress}`, {headers: authHeaders()}
  );

  if (!res.ok) throw new Error("failed to fetch player");
  return res.json();
}

export async function fetchPlayerConsoleByWallet(wallet) {
  const res = await fetch(`${API_BASE}/players/consoleByWallet/${wallet}`, {headers: authHeaders()});
  if (!res.ok) throw new Error("Failed to load player console");
  return res.json();
}


export async function patchPlayerHandleByWallet(walletAddress, handle) {
  const res = await fetch(
    `${API_BASE}/players/byWallet/${walletAddress}/handle`,
    {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ handle })
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update handle");
  }

  return res.json();
}