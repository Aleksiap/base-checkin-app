'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

// Твой Project ID (WalletConnect)
const walletConnectProjectId = '7e09105ca86c457b8fa31db17ab913da';

const config = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({ 
      appName: 'Base Checkin',
      preference: 'all' // Важно для работы Smart Wallet в приложении Base
    }),
  ],
  ssr: true,
  transports: {
    [base.id]: http(),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider 
          chain={base} 
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY} 
          config={{ appearance: { name: 'Base Checkin', mode: 'dark' } }}
        >
          <RainbowKitProvider theme={darkTheme()} modalSize="compact">
            {children}
          </RainbowKitProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}