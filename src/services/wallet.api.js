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


export async function fetchTerminalWallet(walletAddress) {
  const url = `${API_BASE}/wallets/${walletAddress}`;

  const res = await fetch(url, {
    headers: authHeaders(), // ← REQUIRED
  });

  const text = await res.text();


  if (!res.ok) {
    throw new Error(`wallet fetch failed ${res.status}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function syncTerminalWallet(walletAddress) {
  const res = await fetch(`${API_BASE}/wallets/${walletAddress}/sync`, {
    method: "POST",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("failed to sync wallet");
  return res.json();
}
