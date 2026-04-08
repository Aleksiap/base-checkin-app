'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

// Твой рабочий ID
const walletConnectProjectId = '0d4cd7b0c9cc485c803323c2ceefeeef';

const config = getDefaultConfig({
  appName: 'Base Checkin Tima',
  projectId: walletConnectProjectId,
  chains: [base],
  ssr: true,
  transports: {
    [base.id]: http(),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* В старом коде здесь была минимальная конфигурация. 
            Убираем все 'config={{...}}' из OnchainKit, они всё ломали! */}
        <OnchainKitProvider 
          chain={base} 
          apiKey="OFFLINE_MODE"
        >
          <RainbowKitProvider 
            theme={darkTheme()} 
            modalSize="compact"
          >
            {children}
          </RainbowKitProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}