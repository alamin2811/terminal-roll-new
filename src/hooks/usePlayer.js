// src/hooks/usePlayer.js
import { useQuery } from "@tanstack/react-query";
import { useAppKitAccount } from "@reown/appkit/react";
import { getWalletAddress } from "../lib/solanaProvider";
import { fetchPlayerByWallet } from "../services/player.api";

export function usePlayer() {
  const { isConnected } = useAppKitAccount();
  const address = getWalletAddress();

  return useQuery({
    queryKey: ["player", address],
    queryFn: () => fetchPlayerByWallet(address),
    enabled: isConnected && !!address
  });
}
