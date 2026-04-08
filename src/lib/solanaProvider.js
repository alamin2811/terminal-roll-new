// src/lib/solanaProvider.js

export function getSolanaProvider() {
  return (
    window.okxwallet?.solana ||
    window.phantom?.solana ||
    window.solflare ||
    window.backpack?.solana ||
    window.zerion?.solana ||
    window.braveSolana ||
    window.solana ||
    null
  );
}

export function getWalletAddress() {
  const p = getSolanaProvider();
  const pk = p?.publicKey;

  if (!pk) return null;

  if (typeof pk === "string") return pk;

  if (typeof pk.toBase58 === "function") return pk.toBase58();

  if (typeof pk.toString === "function") return pk.toString();

  return null;
}
