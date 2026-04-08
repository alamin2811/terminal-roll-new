//useTerminalWallet.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppKitAccount } from "@reown/appkit/react";
import { fetchTerminalWallet, syncTerminalWallet } from "../services/wallet.api";
import { depositSol, fetchRelayerPubkey, withdrawSol } from "../services/solanaWallet.service";
import { recordTransaction } from "../services/transactions.api";
import { getWalletAddress, getSolanaProvider } from "../lib/solanaProvider";

export function useTerminalWallet() {
  const { isConnected } = useAppKitAccount();
  const queryClient = useQueryClient();
  const address = getWalletAddress();

  const walletQuery = useQuery({
    queryKey: ["terminalWallet", address],
    queryFn: () => fetchTerminalWallet(address),
    enabled: isConnected && !!address,
  });

  const relayerQuery = useQuery({
    queryKey: ["relayerPubkey"],
    queryFn: fetchRelayerPubkey,
    staleTime: Infinity,
  });

  const depositMutation = useMutation({
    mutationFn: async (amountSol) => {
      const provider = getSolanaProvider();

      //if (!window.solana) throw new Error("Wallet missing");
      if (!provider) throw new Error("Wallet missing");
      if (!address) throw new Error("Wallet address missing");
      if (!relayerQuery.data) throw new Error("Relayer not loaded");
      //if (!walletProvider?.publicKey) { throw new Error("Wallet not ready"); }

      const sig = await depositSol({
        //wallet: window.solana,
        wallet: provider,
        ownerAddress: address,
        amountSol,
        relayerPubkey: relayerQuery.data,
      });

      await recordTransaction({
        walletAddress: address,
        txHash: sig,
        amountLamports: Math.floor(amountSol * 1e9),
        type: "deposit",
      });

      return sig;

    },
    onSuccess: async () => {
      await syncTerminalWallet(address);
      queryClient.invalidateQueries({
        queryKey: ["terminalWallet", address],
      });
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: async (amountSol) => {
      const provider = getSolanaProvider();

      //if (!window.solana) throw new Error("Wallet missing");
      if (!provider) throw new Error("Wallet missing");
      if (!address) throw new Error("Wallet address missing");
      //if (!walletProvider?.publicKey) { throw new Error("Wallet not ready"); }

      const sig = await withdrawSol({
        //wallet: window.solana,
        wallet: provider,
        ownerAddress: address,
        amountSol,
      });

await recordTransaction({
  walletAddress: address,
  txHash: sig,
  type: "withdrawal",
  amountLamports: Math.floor(amountSol * 1e9),
});

      return sig;
    },
    onSuccess: async () => {
      await syncTerminalWallet(address);
      queryClient.invalidateQueries({
        queryKey: ["terminalWallet", address],
      });
    },
  });

  return {
    wallet: walletQuery.data,
    deposit: depositMutation.mutateAsync,
    withdraw: withdrawMutation.mutateAsync,
    depositing: depositMutation.isPending,
    withdrawing: withdrawMutation.isPending,
    refetch: walletQuery.refetch,
  };
}


