'use client';

import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import { base } from 'wagmi/chains';

// ТВОЙ АДРЕС С ПРАВИЛЬНЫМ РЕГИСТРОМ (Checksum)
const CONTRACT_ADDRESS = '0xe57671740932D63E2507db7ceBd0B50d737eC649' as `0x${string}`; 

const ABI = [
  { name: 'checkIn', type: 'function', stateMutability: 'nonpayable', inputs: [] },
  { name: 'getCount', type: 'function', stateMutability: 'view', inputs: [{ name: 'user', type: 'address' }], outputs: [{ name: '', type: 'uint256' }] },
] as const;

export default function Home() {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { data: count, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'getCount',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { writeContract, isPending } = useWriteContract();

  const handleCheckIn = () => {
    if (!isConnected) return;
    
    console.log("Попытка чекина на контракт:", CONTRACT_ADDRESS);

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'checkIn',
    }, {
      onSuccess: (hash) => {
        console.log("Транзакция отправлена! Hash:", hash);
        setTimeout(() => refetch(), 5000);
      },
      onError: (err) => {
        console.error("Ошибка кошелька:", err);
        alert("Проверь кошелек: возможно, нужно переключиться на Base вручную.");
      }
    });
  };

  if (!mounted) return null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#000510] text-white p-4 relative overflow-hidden">
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[100px] rounded-full"></div>
      
      <div className="z-10 w-full max-w-[380px] bg-white/[0.03] border border-white/10 p-6 rounded-[32px] backdrop-blur-2xl shadow-2xl flex flex-col items-center">
        
        <div className="w-16 h-16 mb-4 shadow-[0_0_30px_rgba(0,82,255,0.2)]">
          <img 
            src="https://avatars.githubusercontent.com/u/108554348?s=200&v=4" 
            alt="Base" 
            className="w-full h-full rounded-2xl object-cover"
          />
        </div>
        
        <h1 className="text-2xl font-black mb-6 text-center">Base Check-in</h1>

        <div className="mb-8 scale-105">
          <ConnectButton label="Connect Wallet" />
        </div>

        <div className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-4 mb-4 flex justify-between items-center">
          <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">Total Check-ins:</span>
          <span className="text-3xl font-black text-blue-400">
            {isConnected ? (count?.toString() || '0') : '--'}
          </span>
        </div>

        <button
          onClick={handleCheckIn}
          disabled={!isConnected || isPending}
          className={`w-full py-4 rounded-2xl font-black text-lg transition-all active:scale-[0.97] 
            ${isConnected 
              ? 'bg-white text-[#000510] hover:bg-slate-200' 
              : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
        >
          {isPending ? 'Confirm in Wallet...' : 'Daily Check-in'}
        </button>
      </div>

      <div className="mt-8 flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/5 opacity-50">
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
        <span className="text-[9px] uppercase tracking-[0.3em] font-black text-slate-400">Live on Base</span>
      </div>
    </main>
  );
}