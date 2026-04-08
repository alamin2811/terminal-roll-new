// src/hooks/useEnsurePlayer.js
import { useEffect, useRef } from "react";
import { useAppKitAccount } from "@reown/appkit/react";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://api.terminalroll.com";

export function useEnsurePlayer() {
  const { isConnected, address } = useAppKitAccount();
  const hasSession = !!localStorage.getItem("sessionToken");
  const inFlightRef = useRef(false);
  const hasUpsertedRef = useRef(false);

  useEffect(() => {
    // reset when wallet disconnects
    if (!isConnected || !address || !hasSession) {
      inFlightRef.current = false;
      hasUpsertedRef.current = false;
      return;
    }

    const token = localStorage.getItem("sessionToken");
    if (!token) return;

    if (hasUpsertedRef.current || inFlightRef.current) return;

    inFlightRef.current = true;

    fetch(`${API_BASE}/players/upsert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        walletAddress: address,
        handle: null,
        referredByCode: localStorage.getItem("invite"),
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("upsert failed");
        hasUpsertedRef.current = true;
      })
      .catch(() => {
        inFlightRef.current = false;
      });
  }, [isConnected, address, hasSession]);
}


/*import { useAppKitAccount } from "@reown/appkit/react";
import { useEffect, useRef } from "react";
import { getSolanaProvider, getWalletAddress } from "../lib/solanaProvider";


const API_BASE =
  import.meta.env.VITE_API_BASE || "https://api.terminalroll.com";

export function useEnsurePlayer() {
  const { isConnected } = useAppKitAccount();
  const inFlightRef = useRef(false);
  const hasUpsertedRef = useRef(false);

  useEffect(() => {
    if (!isConnected) {
      hasUpsertedRef.current = false;
      inFlightRef.current = false;
      return;
    }

    const token = localStorage.getItem("sessionToken");

    if (!token) {
      inFlightRef.current = false;
      return;
    }

    if (hasUpsertedRef.current) return;

    let attempts = 0;
    const MAX_ATTEMPTS = 100; 


    const interval = setInterval(async () => {
      if (inFlightRef.current) return;
      const provider = getSolanaProvider();

      if (provider && !provider.publicKey && typeof provider.connect === "function") {
        try { await provider.connect(); } catch {}
      }
      
      const address = getWalletAddress();
      if (!address) {
        attempts++;
        if (attempts >= MAX_ATTEMPTS) {
          clearInterval(interval);
        }
        return;
      }

      inFlightRef.current = true;
      
      const referredByCode = localStorage.getItem("invite");
      const handle = null;

      try {
        const res = await fetch(`${API_BASE}/players/upsert`, {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, },
          body: JSON.stringify({
            walletAddress: address,
            handle: null,
            referredByCode: localStorage.getItem("invite"),
          }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        hasUpsertedRef.current = true;
        clearInterval(interval);
      } catch {
        inFlightRef.current = false;
      }

    }, 500);  

    return () => clearInterval(interval);

  }, [isConnected]);
}*/
