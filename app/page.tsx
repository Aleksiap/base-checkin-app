"use client";

import { useEffect, useState } from "react";
import { 
  useAccount, 
  useReadContract, 
  useWriteContract, 
  useWaitForTransactionReceipt 
} from "wagmi";
import { 
  ConnectWallet, 
  Wallet, 
  WalletDropdown, 
  WalletDropdownDisconnect 
} from "@coinbase/onchainkit/wallet";
import { 
  Address, 
  Avatar, 
  Name, 
  Identity 
} from "@coinbase/onchainkit/identity";
import { CONTRACT_ADDRESS, CHECKIN_ABI } from "./constants";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: checkIns, refetch: refetchCheckIns, isFetching: isFetchingCount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CHECKIN_ABI,
    functionName: "getCount",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { data: canCheckIn, refetch: refetchCanCheckIn, isFetching: isFetchingStatus } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CHECKIN_ABI,
    functionName: "canUserCheckIn",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { writeContract, data: hash, isPending: isWriting, reset: resetWrite } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ 
    hash,
    confirmations: 1, 
  });

  // Сбрасываем статус транзакции при смене адреса, чтобы кнопка не "залипала" в Wait
  useEffect(() => {
    resetWrite();
  }, [address, resetWrite]);

  useEffect(() => {
    if (isConfirmed) {
      refetchCheckIns();
      refetchCanCheckIn();
    }
  }, [isConfirmed, refetchCheckIns, refetchCanCheckIn]);

  if (!mounted) return null;

  // Кнопка блокируется если: 
  // 1. Контракт сказал "нельзя" (false)
  // 2. Мы только что успешно подтвердили транзакцию (isConfirmed)
  // 3. Идет процесс загрузки данных для НОВОГО кошелька (isFetchingStatus)
  const isWaitingNextDay = canCheckIn === false || isConfirmed;
  const showLoading = isWriting || isConfirming;
  const isDisabled = isWaitingNextDay || showLoading || !isConnected || isFetchingStatus;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#000510] text-white p-6 font-sans relative overflow-hidden">
      
      <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] bg-[#3b99ff]/10 blur-[130px] rounded-full"></div>
      
      <div className="z-10 w-full max-w-[370px] flex flex-col items-center gap-5">
        
        <div className="w-full bg-[#0a0e1a] border border-white/10 p-9 rounded-[48px] backdrop-blur-3xl flex flex-col items-center shadow-2xl">
          
          <div className="w-20 h-20 mb-4">
            <img src="/base-square.png" alt="Base Logo" className="w-full h-full object-contain rounded-[24px]" />
          </div>
          
          <h1 className="text-2xl font-black tracking-tight mb-6 text-center">Base Check-in</h1>

          <div className="w-full flex justify-center mb-1">
            <Wallet>
              <ConnectWallet 
                text="Connect Wallet"
                className={!isConnected 
                  ? "!bg-[#3b99ff] hover:!bg-[#2a88f0] !text-white !font-bold !py-3 !px-9 !rounded-2xl !text-base !transition-all !w-fit !mx-auto" 
                  : "!w-full !bg-white/5 !text-white !font-bold !py-3.5 !px-5 !rounded-2xl !flex !justify-center !items-center !text-sm"
                } 
              />
              <WalletDropdown className="bg-[#0a0e1a] border border-white/10 shadow-2xl rounded-2xl">
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar /><Name /><Address className="text-slate-400" />
                </Identity>
                <WalletDropdownDisconnect className="hover:bg-red-500/10 text-red-500 font-bold" />
              </WalletDropdown>
            </Wallet>
          </div>

          {isConnected && (
            <div className="w-full flex flex-col items-center gap-5 mt-6 animate-in fade-in zoom-in-95 duration-500">
              
              <div className="w-full bg-[#060912] border border-white/5 rounded-[24px] p-5 flex justify-between items-center">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Streaks</span>
                <span className="text-5xl font-black text-[#3b99ff]">
                  {/* Если данные грузятся для нового кошелька, показываем 0, а не старый страйк */}
                  {isFetchingCount ? "0" : (checkIns?.toString() || "0")}
                </span>
              </div>

              <button
                onClick={() => writeContract({
                  address: CONTRACT_ADDRESS,
                  abi: CHECKIN_ABI,
                  functionName: "checkIn",
                })}
                disabled={isDisabled}
                style={{ 
                    width: '180px', 
                    height: '44px',
                    minHeight: '44px',
                    padding: '0'
                }}
                className={`rounded-[20px] font-black transition-all active:scale-95 shadow-2xl flex justify-center items-center whitespace-nowrap ${
                  !isDisabled && !showLoading 
                    ? "bg-[#3b99ff] text-white hover:bg-[#2a88f0] cursor-pointer text-lg" 
                    : "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed text-base"
                }`}
              >
                {isWriting ? "Confirming..." : 
                 isConfirming ? "Processing..." : 
                 isWaitingNextDay ? "Wait 24 Hours" : 
                 isFetchingStatus ? "Loading..." : "Check-in"}
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/5 rounded-full opacity-50">
          <div className="w-1.5 h-1.5 bg-[#3b99ff] rounded-full animate-pulse shadow-[0_0_5px_#3b99ff]"></div>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
            Mainnet Live
          </span>
        </div>

      </div>
    </main>
  );
}