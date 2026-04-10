'use client';

import { useAccount, useConnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';

export function SmartConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const [isBaseApp, setIsBaseApp] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Определяем, открыто ли приложение внутри Base App
    const ua = navigator.userAgent;
    const isBase = ua.includes('Base') || ua.includes('CBase') || ua.includes('com.base');
    setIsBaseApp(isBase);
  }, []);

  // Подключение к Coinbase Wallet (для Base App)
  const connectCoinbaseWallet = async () => {
    setIsConnecting(true);
    try {
      // Ищем Coinbase Wallet connector
      const coinbaseConnector = connectors.find(
        c => c.id === 'coinbaseWalletSDK' || c.name === 'Coinbase Wallet'
      );
      
      if (coinbaseConnector) {
        await connect({ connector: coinbaseConnector });
      } else if ((window as any).ethereum) {
        // Fallback: прямой вызов
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        window.location.reload();
      } else {
        console.error('No wallet provider found');
      }
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Если внутри Base App — кнопка для Coinbase Wallet
  if (isBaseApp) {
    if (isConnected && address) {
      return (
        <div className="bg-green-500/20 px-4 py-2 rounded-full">
          <span className="text-green-400 text-sm">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
      );
    }

    return (
      <button
        onClick={connectCoinbaseWallet}
        disabled={isConnecting}
        className="bg-white text-black px-6 py-3 rounded-xl font-bold disabled:opacity-50"
      >
        {isConnecting ? 'Connecting...' : 'Connect Coinbase Wallet'}
      </button>
    );
  }

  // Если в обычном браузере — стандартный ConnectButton (там будет Base Account)
  return <ConnectButton />;
}