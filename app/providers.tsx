'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { coinbaseWallet, metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

const projectId = '7e09105ca86c457b8fa31db17ab913da';

const config = getDefaultConfig({
  appName: 'Base Check-in',
  projectId: projectId,
  chains: [base],
  ssr: false,
  transports: {
    [base.id]: http(),
  },
  // Не указываем wallets — тогда RainbowKit показывает ВСЕ доступные кошельки
  // Base Account, Coinbase Wallet, MetaMask — все будут в меню
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()} modalSize="compact">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}