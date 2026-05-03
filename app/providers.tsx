"use client";

import { ReactNode, useState, useEffect } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { injected, coinbaseWallet } from "wagmi/connectors";
import "@coinbase/onchainkit/styles.css";

// Клиент для обработки запросов
const queryClient = new QueryClient();

// Конфигурация Wagmi с поддержкой расширений (Phantom, Zerion и др.)
const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({ 
      appName: "Base Checkin",
      preference: "all" 
    }),
    injected(), // Позволяет находить любые установленные расширения
  ],
  ssr: true,
  transports: {
    [base.id]: http(),
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
          apiKey={process.env.NEXT_PUBLIC_ONCHAIN_KIT_API_KEY ?? ""}
          chain={base}
          config={{
            appearance: {
              mode: "dark",
            },
            wallet: {
              display: "modal", // Принудительный вызов окна выбора кошелька
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