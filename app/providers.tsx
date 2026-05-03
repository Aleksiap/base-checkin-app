"use client";

import { ReactNode, useState, useEffect } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { injected, coinbaseWallet } from "wagmi/connectors";
import "@coinbase/onchainkit/styles.css";

// Подтягиваем твои ключи
const apiKey = process.env.NEXT_PUBLIC_ONCHAIN_KIT_API_KEY ?? "";
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "";

// Формируем твою личную ссылку для дашборда Base (CDP)
const cdpUrl = `https://api.developer.coinbase.com/rpc/v1/base/${apiKey}`;

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({ 
      appName: "Base Checkin",
      preference: "all" 
    }),
    injected(), 
  ],
  ssr: true,
  transports: {
    // ВАЖНО: Именно эта строчка отправляет статистику в твой дашборд разработчика
    [base.id]: http(apiKey ? cdpUrl : undefined),
  },
});

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={apiKey}
          projectId={projectId}
          chain={base}
          config={{
            appearance: {
              mode: "dark",
            },
            wallet: {
              display: "modal", 
              preference: "all",
            },
          }}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}