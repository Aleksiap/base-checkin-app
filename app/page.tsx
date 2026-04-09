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
      backgroundColor: '#000',
      color: '#fff',
      gap: '20px'
    }}>
      <h1 style={{ fontFamily: 'sans-serif', margin: 0 }}>Base Daily Check-in</h1>
      
      <div style={{ 
        background: '#1a1a1a', 
        padding: '30px', 
        borderRadius: '20px', 
        border: '1px solid #333' 
      }}>
        <ConnectButton label="Connect to Base" />
      </div>

      <div style={{ fontSize: '10px', color: '#444' }}>
        App ID: 69d6b9690...
      </div>
    </main>
  );
}