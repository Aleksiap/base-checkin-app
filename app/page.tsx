'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Page() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      backgroundColor: '#000', // Черный фон, чтобы кнопка выделялась
      color: '#fff'
    }}>
      <h1 style={{ marginBottom: '20px', fontFamily: 'sans-serif' }}>Base Check-in</h1>
      
      <div style={{ padding: '20px' }}>
        {/* Это стандартная кнопка RainbowKit */}
        <ConnectButton label="Connect Wallet" />
      </div>

      <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        Vercel Build: Ready
      </p>
    </main>
  );
}