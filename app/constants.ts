export const CONTRACT_ADDRESS = '0x5e40c2dfd854e9ca00f6902789edf2d03fa52b07' as const;

export const CHECKIN_ABI = [
  {
    inputs: [],
    name: 'checkIn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'canUserCheckIn',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getCount',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '', type: 'address' }],
    name: 'checkIns',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '', type: 'address' }],
    name: 'lastCheckInTimestamp',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
