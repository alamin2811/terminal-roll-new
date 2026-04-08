// src/hooks/useAuthSession.js
import { useEffect, useState, useCallback } from "react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { authenticate } from "../services/auth.api";

export function useAuthSession() {
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("solana");

  const [needsAuth, setNeedsAuth] = useState(false);

  useEffect(() => {
    if (!isConnected || !address) {
      setNeedsAuth(false);
      return;
    }
    setNeedsAuth(!localStorage.getItem("sessionToken"));
  }, [isConnected, address]);

  useEffect(() => {
    const onAuthRequired = () => setNeedsAuth(true);
    window.addEventListener("AUTH_REQUIRED", onAuthRequired);
    return () => window.removeEventListener("AUTH_REQUIRED", onAuthRequired);
  }, []);

  const startAuth = useCallback(async () => {
    try {
      if (!isConnected || !address) throw new Error("wallet not ready");
      if (!walletProvider || typeof walletProvider.signMessage !== "function") {
        throw new Error("wallet sign not ready");
      }

      await authenticate({
        publicKey: { toBase58: () => address },
        signMessage: (bytes) => walletProvider.signMessage(bytes),
      });

      setNeedsAuth(false);
    } catch (e) {
      console.error("auth failed", e);
      setNeedsAuth(true);
    }
  }, [isConnected, address, walletProvider]);

  const dismiss = useCallback(() => {
    setNeedsAuth(true);
  }, []);

  return { needsAuth, startAuth, dismiss };
}



