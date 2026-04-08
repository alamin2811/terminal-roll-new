// src/services/auth.api.js
import { Buffer } from "buffer";

const API_BASE = import.meta.env.VITE_API_BASE || "https://api.terminalroll.com";

/*
  authenticate()
  requests nonce
  signs nonce
  verifies signature
  stores sessionToken
*/
export async function authenticate({ publicKey, signMessage }) {
  if (!publicKey || typeof signMessage !== "function") {
    throw new Error("wallet not ready");
  }

  const walletAddress = publicKey.toBase58();

  // 1) GET NONCE
  const nonceRes = await fetch(`${API_BASE}/auth/nonce`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ walletAddress }),
  });

  if (!nonceRes.ok) throw new Error("failed to get auth nonce");

  const { nonce } = await nonceRes.json();
  if (!nonce) throw new Error("missing nonce");

  // 2) SIGN NONCE (Buffer required by your signMessage)
  const messageBuffer = Buffer.from(nonce, "utf8");
  const signed = await signMessage(messageBuffer);

  // support both return shapes: Uint8Array OR { signature: Uint8Array }
  const signatureBytes = signed?.signature ?? signed;
  if (!signatureBytes) throw new Error("wallet returned no signature");

  // 3) VERIFY
  const verifyRes = await fetch(`${API_BASE}/auth/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      walletAddress,
      nonce,
      signature: Buffer.from(signatureBytes).toString("base64"),
    }),
  });

  if (!verifyRes.ok) throw new Error("auth verification failed");

  const { token } = await verifyRes.json();
  if (!token) throw new Error("missing session token");

  localStorage.setItem("sessionToken", token);
  return token;
}
