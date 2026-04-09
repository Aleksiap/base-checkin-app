'use client';

import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function useBaseConnection() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isBaseApp, setIsBaseApp] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setIsBaseApp(ua.includes('Base') || ua.includes('CBase') || ua.includes('com.base'));
  }, []);

  const connectBaseAccount = async () => {
    setIsConnecting(true);
    try {
      const baseConnector = connectors.find(
        c => c.id === 'io.metamask' || c.name === 'MetaMask'
      );
      
      if (baseConnector) {
        await connect({ connector: baseConnector });
      } else if ((window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts'
        });
        if (accounts[0]) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectBase = () => {
    disconnect();
    localStorage.removeItem('wagmi.connectedConnectorId');
    localStorage.removeItem('wagmi.store');
    sessionStorage.clear();
  };

  return {
    address,
    isConnected,
    isConnecting,
    isBaseApp,
    connectBaseAccount,
    disconnectBase,
  };
}