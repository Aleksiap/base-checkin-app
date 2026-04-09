'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { coinbaseWallet, walletConnect, injected } from 'wagmi/connectors';
import { RainbowKitProvider, darkTheme, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { 
  metaMaskWallet, 
  walletConnectWallet, 
  coinbaseWallet as rainbowCoinbaseWallet 
} from '@rainbow-me/rainbowkit/wallets';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();
const projectId = '7e09105ca86c457b8fa31db17ab913da';

// Настраиваем группы кошельков для меню
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        rainbowCoinbaseWallet({ appName: 'Base Checkin', preference: 'smartWalletOnly' }),
        metaMaskWallet({ projectId }),
        walletConnectWallet({ projectId }),
      ],
    },
  ],
  {
    appName: 'Base Checkin',
    projectId,
  }
);

const config = createConfig({
  connectors,
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
        <OnchainKitProvider 
          chain={base} 
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          config={{ 
            appearance: { name: 'Base Checkin', mode: 'dark' },
            wallet: { display: 'all', isSmartWalletEnabled: true }
          }}
        >
          <RainbowKitProvider theme={darkTheme()} modalSize="compact">
            {children}
          </RainbowKitProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}