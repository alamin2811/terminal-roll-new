// src/services/freeRoll.api.js
import { PublicKey } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { getSolanaProvider, getWalletAddress } from "../lib/solanaProvider";
import { fetchRelayerPubkey } from "../services/solanaWallet.service";
import { solanaConnection } from "../lib/solanaConnection";
import bankIdl from "../idl/terminalwallet.json";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://api.terminalroll.com";

const BANK_PROGRAM_ID = new PublicKey(
  "bZrJVJFwvH6rEs3vkzv5hu9d6JtDiX7mWVWbCbD6SXJ"
);

/* -------------------------------------------
   RAW BACKEND CALL
-------------------------------------------- */
async function callFreeRoll(walletAddress) {
  const token = localStorage.getItem("sessionToken");
  if (!token) throw new Error("not authenticated");

  const res = await fetch(
    `${API_BASE}/freerolls/${walletAddress}/consume`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ walletAddress }),
    }
  );

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const msg =
      (data && (data.error || data.message)) ||
      `Roll failed (${res.status})`;
    throw new Error(msg);
  }

  return data;
}

/* -------------------------------------------
   PUBLIC: FREE ROLL WITH ESCROW BOOTSTRAP
-------------------------------------------- */
export async function rollFreeRoll({ walletAddress }) {
  try {
    return await callFreeRoll(walletAddress);
  } catch (err) {
    const msg = String(err?.message || err);

    if (!msg.includes("ESCROW_REQUIRED")) {
      throw err;
    }

    // ---- USE EXISTING WALLET + CONNECTION ----
    const wallet = getSolanaProvider();
    const ownerAddress = getWalletAddress();

    if (!wallet) throw new Error("wallet missing");
    if (!ownerAddress) throw new Error("wallet address missing");

    const provider = new anchor.AnchorProvider(
      solanaConnection,
      wallet,
      { commitment: "confirmed" }
    );

    const program = new anchor.Program(
      bankIdl,
      provider
    );

    
    const ownerPk = new PublicKey(ownerAddress);

    const [escrowPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("escrow"), ownerPk.toBuffer()],
      BANK_PROGRAM_ID
    );

    await program.methods
      .createEscrow()
      .accounts({
        owner: ownerPk,
        escrow: escrowPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    // ---- RETRY FREE ROLL ----
    return await callFreeRoll(walletAddress);
  }
}

/* -------------------------------------------
   GET FREE ROLL STATE
-------------------------------------------- */
export async function getFreeRolls({ walletAddress }) {
  const token = localStorage.getItem("sessionToken");
  if (!token) throw new Error("not authenticated");

  const res = await fetch(
    `${API_BASE}/freerolls/${walletAddress}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const msg =
      (data && (data.error || data.message)) ||
      `Get free rolls failed (${res.status})`;
    throw new Error(msg);
  }

  return data;
}
