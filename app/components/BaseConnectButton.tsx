'use client';

import { useBaseConnection } from '../hooks/useBaseConnection';

export function BaseConnectButton() {
  const { 
    address, 
    isConnected, 
    isConnecting, 
    isBaseApp,
    connectBaseAccount, 
    disconnectBase 
  } = useBaseConnection();

  if (isConnected && address) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="bg-green-500/20 px-4 py-2 rounded-full">
          <span className="text-green-400 text-sm">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <button
          onClick={disconnectBase}
          className="text-red-400 text-sm hover:text-red-300 transition"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectBaseAccount}
      disabled={isConnecting}
      className="bg-white text-black px-6 py-3 rounded-xl font-bold disabled:opacity-50"
    >
      {isConnecting ? 'Connecting...' : (isBaseApp ? 'Connect Base Account' : 'Connect Wallet')}
    </button>
  );
}