"use client";
import { ReactNode } from "react";
import { getDefaultConfig, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, polygon, arbitrum } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const config = createConfig(
  getDefaultConfig({
    appName: "BlockPoll",
    projectId: "blockpoll-demo", // replace with WalletConnect Project ID in production
    chains: [polygon, arbitrum, mainnet],
    transports: {
      [polygon.id]: http(),
      [arbitrum.id]: http(),
      [mainnet.id]: http(),
    },
    ssr: true,
  })
);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={lightTheme({ overlayBlur: "small" })}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}


