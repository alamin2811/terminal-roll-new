import { Connection, PublicKey } from "@solana/web3.js";

export const DEVNET_RPC = "https://api.devnet.solana.com";
export const MAINNET_RPC = "https://mainnet.helius-rpc.com/?api-key=147de1e7-2393-417a-b0b4-6ccae5cbaec8";



const isProd = import.meta.env.PROD === true;

export const RPC_URL = isProd
  ? MAINNET_RPC
  : DEVNET_RPC;

export const solanaConnection = new Connection(
  RPC_URL,
  "confirmed"
);

/**
 * Get SOL balance for a wallet address
 * Returns number in SOL
 */
export async function getSolBalance(address) {
  if (!address) return null;

  const lamports = await solanaConnection.getBalance(
    new PublicKey(address),
    "confirmed"
  );

  return lamports / 1e9;
}


/**
 * Get SOL balance for an escrow PDA
 * Returns number in SOL
 */
export async function getEscrowBalance(pda) {
  if (!pda) return null;

  const lamports = await solanaConnection.getBalance(
    new PublicKey(pda),
    "confirmed"
  );

  return lamports / 1e9;
}

/**
 * Fetch raw on chain program state account data
 * Returns Buffer
 *
 * You will decode this later using Anchor or manual layout
 */
export async function getProgramState(programStatePda) {
  if (!programStatePda) return null;

  const accountInfo = await solanaConnection.getAccountInfo(
    new PublicKey(programStatePda),
    "confirmed"
  );

  if (!accountInfo) return null;

  return accountInfo.data;
}