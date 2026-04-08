import { createAppKit } from "@reown/appkit/react";
import { SolanaAdapter } from "@reown/appkit-adapter-solana";
import { solana, solanaDevnet, solanaTestnet } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 1. Query client
const queryClient = new QueryClient();

// 2. Project ID
const projectId = "c2ebaa4d680e6a8fb0b342da0e1fef44";

// 3. Solana networks only
//const networks = [solana, solanaDevnet, solanaTestnet];
//const networks = [solanaDevnet];

const isProd = import.meta.env.PROD === true;

const networks = isProd
  ? [solana]
  : [solanaDevnet];

const defaultNetwork = isProd
  ? solana
  : solanaDevnet;


// 4. Solana adapter
const solanaAdapter = new SolanaAdapter({
  projectId,
  networks,
});



// 5. Create AppKit (ONLY Phantom + Backpack)
createAppKit({
  adapters: [solanaAdapter],
  networks,
  defaultNetwork,
  projectId,

  features: {
    analytics: true,
    walletConnect: false,  // hide QR
    connectMethodsOrder: ["wallet"],
  },

  featuredWalletIds: [
    "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393", //phantom
    "2bd8c14e035c2d48f184aaa168559e86b0e3433228d3c4075900a221785019b0", //backpack
  ],

  themeVariables: {
    "--w3m-font-family": '"Chakra Petch", sans-serif',
    "--w3m-accent": "#ffffff",
    "--w3m-border-radius-master": "2px",
    "--w3m-background-color": "#0b0b0b",
  },
});

export function AppKitProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
