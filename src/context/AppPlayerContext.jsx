// src/context/AppPlayerContext.jsx
import { createContext, useContext } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { usePlayer } from "../Hooks/usePlayer";
import { useTerminalWallet } from "../Hooks/useTerminalWallet";
//import { getWalletAddress } from "../lib/solanaProvider";

const AppPlayerContext = createContext(null);

export function AppPlayerProvider({ children }) {
  const { isConnected, address } = useAppKitAccount();
  //const address = getWalletAddress();
  const { data: player, isLoading: playerLoading } = usePlayer();
  const { wallet, isLoading: walletLoading, refetch: refreshTerminalWallet } = useTerminalWallet();

  return (
    <AppPlayerContext.Provider
      value={{
        userWalletAddress: address,
        isConnected,
        player,
        terminalWallet: wallet,
        refreshTerminalWallet,
        loading: playerLoading || walletLoading
      }}
    >
      {children}
    </AppPlayerContext.Provider>
  );
}

export function useAppPlayer() {
  return useContext(AppPlayerContext);
}
