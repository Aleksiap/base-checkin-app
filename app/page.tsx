'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BaseConnectButton } from './components/BaseConnectButton';
import { ResetButton } from './components/ResetButton';  // если есть

export default function Page() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      padding: '20px'
    }}>
      <div style={{
        background: '#111',
        padding: '40px',
        borderRadius: '24px',
        border: '1px solid #333',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        <h1 style={{ marginBottom: '24px', fontSize: '24px' }}>Base Check-in</h1>
        
        {/* Кнопка с отключенным балансом для быстрой загрузки */}
        <ConnectButton 
          label="Connect Wallet"
          showBalance={false}
          chainStatus="icon"
          accountStatus="address"
        />
        
        <p style={{ marginTop: '20px', fontSize: '12px', color: '#555' }}>
          Status: Network Base Ready
        </p>
      </div>
    </main>
  );
}