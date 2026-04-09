'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

// Твой новый Project ID
const walletConnectProjectId = '7e09105ca86c457b8fa31db17ab913da';

const config = getDefaultConfig({
  appName: 'Base Checkin',
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
        {/* В старом коде OnchainKit был пустой оберткой без конфигов. Возвращаем так же. */}
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