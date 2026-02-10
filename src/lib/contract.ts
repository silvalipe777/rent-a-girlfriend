export const PAYMENT_CONTRACT_ADDRESS = (process.env
  .NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS || "") as `0x${string}`;

export const OWNER_WALLET = "0x57da35375e8Db16f82e38E6a6c08f0576627a62D";

export const PAYMENT_CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "payer", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
      { indexed: false, internalType: "string", name: "companionId", type: "string" },
      { indexed: false, internalType: "string", name: "plan", type: "string" },
    ],
    name: "PaymentReceived",
    type: "event",
  },
  {
    inputs: [
      { internalType: "string", name: "companionId", type: "string" },
      { internalType: "string", name: "plan", type: "string" },
    ],
    name: "pay",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
