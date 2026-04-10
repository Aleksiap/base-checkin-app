'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState, useEffect } from 'react';

export function BaseConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isBaseApp, setIsBaseApp] = useState(false);

  useEffect(() => {
    // Проверяем, открыто ли внутри Base App
    const ua = navigator.userAgent;
    setIsBaseApp(ua.includes('Base') || ua.includes('CBase') || ua.includes('com.base'));
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // Для Base App — прямой вызов
      if (isBaseApp) {
        // Пробуем открыть Coinbase Wallet
        window.location.href = 'cbwallet://';
        setTimeout(() => {
          // Если не открылся — предлагаем установить
          window.location.href = 'https://go.cb-w.com/mobile/download';
        }, 500);
      } else {
        // Для обычного браузера — через wagmi
        const coinbaseConnector = connectors.find(c => c.id === 'coinbaseWallet');
        if (coinbaseConnector) {
          await connect({ connector: coinbaseConnector });
        } else {
          // Fallback: первый доступный коннектор
          const anyConnector = connectors[0];
          if (anyConnector) await connect({ connector: anyConnector });
        }
      }
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  if (isConnected && address) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="bg-green-500/20 px-4 py-2 rounded-full">
          <span className="text-green-400 text-sm">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <button
          onClick={() => disconnect()}
          className="text-red-400 text-sm hover:text-red-300"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className="bg-white text-black px-6 py-3 rounded-xl font-bold disabled:opacity-50 w-full"
    >
      {isConnecting ? 'Connecting...' : 'Connect Coinbase Wallet'}
    </button>
  );
}