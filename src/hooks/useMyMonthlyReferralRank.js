import { useQuery } from "@tanstack/react-query";
import { useAppKitAccount } from "@reown/appkit/react";
import { getWalletAddress } from "../lib/solanaProvider";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://api.terminalroll.com";

async function fetchMyMonthlyReferralRank(walletAddress) {
  const res = await fetch(
    `${API_BASE}/leaderboards/referrals/monthly/me/${walletAddress}`
  );
  if (!res.ok) throw new Error("failed to fetch referral rank");
  return res.json();
}

export function useMyMonthlyReferralRank() {
  const { isConnected } = useAppKitAccount();
  const address = getWalletAddress();

  const query = useQuery({
    queryKey: ["myReferralRank", address],
    queryFn: () => fetchMyMonthlyReferralRank(address),
    enabled: isConnected && !!address
  });

  const data = query.data;

  const isRanked = !!data && data.rank !== null;

  return {
    ...query,
    rank: isRanked ? data.rank : null,
    referralCount: data?.referralCount || 0,
    month: data?.month || null,
    isRanked,
    rankLabel: isRanked ? `#${data.rank}` : "—",
    statusLabel: isRanked ? "RANKED" : "NOT RANKED"
  };
}
