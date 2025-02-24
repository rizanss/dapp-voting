"use client";

import { WagmiConfig } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Buat instance QueryClient
const queryClient = new QueryClient();

// Ganti ini dengan Project ID dari WalletConnect Cloud
const projectId = "dfaec539373b1118b35f7ac99eb1f1be";

const config = getDefaultConfig({
  appName: "Dapp Voting",
  projectId,
  chains: [
    { id: 1, name: "Ethereum", rpcUrls: ["https://eth.llamarpc.com"] }, // Mainnet
  ],
});

function Navbar() {
  return (
    <nav className="p-4 flex justify-between items-center bg-gray-900 text-white">
      <h1 className="text-xl font-bold">Dapp Voting</h1>
      <ConnectButton />
    </nav>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <WagmiConfig config={config}>
            <RainbowKitProvider>
              <Navbar />
              {children}
            </RainbowKitProvider>
          </WagmiConfig>
        </QueryClientProvider>
      </body>
    </html>
  );
}