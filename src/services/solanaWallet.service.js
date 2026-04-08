// src/services/solanaWallet.service.js
import * as anchor from "@coral-xyz/anchor";
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL, Transaction } from "@solana/web3.js";
import terminalwalletIdl from "../idl/terminalwallet.json";
import { solanaConnection } from "../lib/solanaConnection";

const API_BASE = import.meta.env.VITE_API_BASE || "https://api.terminalroll.com";
const PROGRAM_ID = new PublicKey("bZrJVJFwvH6rEs3vkzv5hu9d6JtDiX7mWVWbCbD6SXJ");

export async function depositSol({
  wallet,
  ownerAddress,
  amountSol,
  relayerPubkey, // same pubkey you pass to createEscrow in your working code
}) {
  const provider = new anchor.AnchorProvider(
    solanaConnection,
    wallet,
    { preflightCommitment: "confirmed" }
  );

  const program = new anchor.Program(terminalwalletIdl, provider);

  const owner = wallet.publicKey; //new PublicKey(ownerAddress);
  const relayer = new PublicKey(relayerPubkey);

  const [escrowPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("escrow"), owner.toBuffer()],
    PROGRAM_ID
  );

  const [configPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("config_v2")],
    PROGRAM_ID
  );

  const lamports = Math.floor(Number(amountSol) * LAMPORTS_PER_SOL);

  const tx = new Transaction();
  tx.feePayer = owner;

  const { blockhash } = await solanaConnection.getLatestBlockhash("confirmed");
  tx.recentBlockhash = blockhash;

  const escrowInfo = await solanaConnection.getAccountInfo(escrowPda);
  if (!escrowInfo) {
    const ixCreate = await program.methods
      //.createEscrow(relayer)
      .createEscrow()
      .accounts({
        owner,
        escrow: escrowPda,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    tx.add(ixCreate);
  }

  const ixDeposit = await program.methods
    .deposit(new anchor.BN(lamports))
    .accounts({
      owner,
      escrow: escrowPda,
      config: configPda,
      systemProgram: SystemProgram.programId,
    })
    .instruction();

  tx.add(ixDeposit);

  const sig = await provider.sendAndConfirm(tx, [], { commitment: "confirmed" });
  return sig;
}

export async function fetchRelayerPubkey() {
  const res = await fetch(`${API_BASE}/solana/relayer`);
  const json = await res.json();
  return json.relayerPubkey;
}

export async function withdrawSol({
  wallet,
  amountSol,
}) {
  const provider = new anchor.AnchorProvider(
    solanaConnection,
    wallet,
    { preflightCommitment: "confirmed" }
  );

  const program = new anchor.Program(terminalwalletIdl, provider);

  const owner = wallet.publicKey;

  const [escrowPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("escrow"), owner.toBuffer()],
    PROGRAM_ID
  );

  const [configPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("config_v2")],
    PROGRAM_ID
  );

  const lamports = Math.floor(Number(amountSol) * LAMPORTS_PER_SOL);

  const ixWithdraw = await program.methods
    .withdraw(new anchor.BN(lamports))
    .accounts({
      owner,
      escrow: escrowPda,
      config: configPda,
    })
    .instruction();

  const tx = new Transaction().add(ixWithdraw);
  tx.feePayer = owner;
  const { blockhash } = await solanaConnection.getLatestBlockhash("confirmed");
  tx.recentBlockhash = blockhash;
  

  const sig = await provider.sendAndConfirm(tx, [], {
    commitment: "confirmed",
  });

  return sig;
}
