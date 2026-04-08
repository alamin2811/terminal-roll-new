// src/hooks/usePlayerConsole.js
import { useQuery } from "@tanstack/react-query";
import { useAppKitAccount } from "@reown/appkit/react";
import { getWalletAddress } from "../lib/solanaProvider";
import { fetchPlayerConsoleByWallet } from "../services/player.api";

export function usePlayerConsole() {
  const { isConnected } = useAppKitAccount();
  const address = getWalletAddress();

  return useQuery({
    queryKey: ["playerConsole", address],
    queryFn: () => fetchPlayerConsoleByWallet(address),
    enabled: isConnected && !!address
  });
}