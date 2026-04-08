const API_BASE =
  import.meta.env.VITE_API_BASE || "https://api.terminalroll.com";

export async function fetchInviteStatsByWallet(walletAddress) {
  const res = await fetch(`${API_BASE}/inviteStats/byWallet/${walletAddress}`);
  if (!res.ok) throw new Error("failed to fetch invite stats");
  return res.json();
}
