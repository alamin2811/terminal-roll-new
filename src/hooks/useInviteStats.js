import { useQuery } from "@tanstack/react-query";
import { useAppKitAccount } from "@reown/appkit/react";
import { getWalletAddress } from "../lib/solanaProvider";
import { fetchInviteStatsByWallet } from "../services/inviteStats.api";

export function useInviteStats() {
  const { isConnected } = useAppKitAccount();
  const address = getWalletAddress();

  return useQuery({
    queryKey: ["inviteStats", address],
    queryFn: () => fetchInviteStatsByWallet(address),
    enabled: isConnected && !!address
  });
}
