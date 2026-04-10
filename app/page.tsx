'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { BaseConnectButton } from './components/BaseConnectButton';
import { CONTRACT_ADDRESS, CHECKIN_ABI } from './constants';

export default function Home() {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Получаем количество чекинов пользователя
  const { data: checkIns, refetch: refetchCheckIns } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CHECKIN_ABI,
    functionName: 'getCount',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  // Проверяем, может ли пользователь сделать чекин
  const { data: canCheckIn, refetch: refetchCanCheckIn } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CHECKIN_ABI,
    functionName: 'canUserCheckIn',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { writeContract, isPending } = useWriteContract();

  const handleCheckIn = () => {
    if (!canCheckIn) return;
    
    setIsChecking(true);
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CHECKIN_ABI,
      functionName: 'checkIn',
    }, {
      onSuccess: () => {
        setTimeout(() => {
          refetchCheckIns();
          refetchCanCheckIn();
          setIsChecking(false);
        }, 3000);
      },
      onError: (error) => {
        console.error('Check-in error:', error);
        setIsChecking(false);
      },
    });
  };

  if (!mounted) return null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#000510] text-white p-4 relative overflow-hidden">
      {/* Фоновое свечение */}
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[100px] rounded-full"></div>
      
      <div className="z-10 w-full max-w-[380px] bg-white/[0.03] border border-white/10 p-6 rounded-[32px] backdrop-blur-2xl shadow-2xl flex flex-col items-center">
        {/* Логотип */}
        <div className="w-20 h-20 mb-4 shadow-[0_0_40px_rgba(0,82,255,0.3)]">
          <img src="/base-square.png" alt="Base Logo" className="w-full h-full rounded-2xl object-contain" />
        </div>
        
        <h1 className="text-2xl font-black mb-6 text-center tracking-tight">Base Check-in</h1>

        {/* Кнопка подключения Coinbase Wallet */}
        <div className="mb-8 w-full">
          <BaseConnectButton />
        </div>

        {/* Информация о чекинах */}
        {isConnected && (
          <>
            <div className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-4 mb-4 flex justify-between items-center">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Check-ins:</span>
              <span className="text-3xl font-black text-blue-400">
                {checkIns?.toString() || '0'}
              </span>
            </div>

            {/* Кнопка чекина */}
            <button
              onClick={handleCheckIn}
              disabled={!canCheckIn || isPending || isChecking}
              className={`w-full py-4 rounded-2xl font-black text-lg transition-all active:scale-[0.97] 
                ${(canCheckIn && !isPending && !isChecking)
                  ? 'bg-white text-[#000510] hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                  : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
            >
              {isPending || isChecking ? 'Confirming...' : (!canCheckIn && checkIns !== undefined) ? 'Wait 24 Hours' : 'Daily Check-in'}
            </button>
          </>
        )}
      </div>

      {/* Статус сеть */}
      <div className="mt-8 flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/5 opacity-50">
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
        <span className="text-[9px] uppercase tracking-[0.3em] font-black text-slate-400">Mainnet Live</span>
      </div>
    </main>
  );
}