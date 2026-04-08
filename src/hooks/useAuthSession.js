import { useEffect, useState, useCallback } from "react";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { authenticate } from "../services/auth.api";

export function useAuthSession() {
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("solana");

  const [authRequired, setAuthRequired] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!isConnected || !address) {
      setAuthRequired(false);
      setModalOpen(false);
      return;
    }

    const needs = !localStorage.getItem("sessionToken");
    setAuthRequired(needs);
    setModalOpen(needs);
  }, [isConnected, address]);

  useEffect(() => {
    const onAuthRequired = () => {
      setAuthRequired(true);
      setModalOpen(true);
    };

    window.addEventListener("AUTH_REQUIRED", onAuthRequired);
    return () => window.removeEventListener("AUTH_REQUIRED", onAuthRequired);
  }, []);

  const startAuth = useCallback(async () => {
    try {
      if (!walletProvider?.signMessage) throw new Error("wallet not ready");

      await authenticate({
        publicKey: { toBase58: () => address },
        signMessage: (bytes) => walletProvider.signMessage(bytes),
      });

      setAuthRequired(false);
      setModalOpen(false);
    } catch {
      setAuthRequired(true);
      setModalOpen(true);
    }
  }, [address, walletProvider]);

  const dismiss = useCallback(() => {
    setModalOpen(false);
  }, []);

  return {
    needsAuth: authRequired && modalOpen,
    startAuth,
    dismiss,
  };
}
