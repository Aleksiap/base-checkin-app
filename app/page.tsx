import { ConnectButton } from '@rainbow-me/rainbowkit';

// Константы твоего контракта
const CONTRACT_ADDRESS = '0x4510004076C3026210f8A4C32f99587285613D10';

export default function Page() {
  return (
    <main style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Daily Check-in</h1>
      
      {/* Кнопка коннекта */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <ConnectButton />
      </div>

      {/* Здесь будет твоя кнопка чекина */}
      {/* ... остальной код ... */}
    </main>
  );
}