export const CONTRACT_ADDRESS = '0x4510004076C3026210f8A4C32f99587285613D10' as const;

export const CHECKIN_ABI = [
  {
    "inputs": [],
    "name": "checkIn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "user","type": "address"}],
    "name": "canUserCheckIn",
    "outputs": [{"name": "","type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "user","type": "address"}],
    "name": "getCount",
    "outputs": [{"name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;