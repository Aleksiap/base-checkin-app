export const CONTRACT_ADDRESS = '0x5e40C2dFD854E9cA00f6902789EdF2d03fA52b07' as const;

export const CHECKIN_ABI = [
    {
        "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
        "name": "canUserCheckIn",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
        "name": "getCount",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "checkIn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const;