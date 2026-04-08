// services/transactions.api.js
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



export async function recordTransaction({
  walletAddress,
  txHash,
  amountLamports,
  type = "deposit",
}) {
  const res = await fetch(`${API_BASE}/transactions/record`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      walletAddress,
      txHash,
      type,
      amountLamports,
    }),
  });

  if (!res.ok) throw new Error("Failed to record transaction");
  return res.json();
}

export async function fetchTransactionsByPlayer(playerId, limit = 50) {
  if (!playerId) throw new Error("Missing playerId");
  
  const res = await fetch(
    `${API_BASE}/transactions/byPlayer/${playerId}?limit=${limit}`,
    {
      headers: authHeaders(), // REQUIRED
    }
  );

  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
}