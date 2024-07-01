export const TRANCHE_CONTRACT = {
  _format: "hh-sol-artifact-1",
  contractName: "Tranche",
  sourceName: "contracts/lender/tranche/tranchePool.sol",
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "token_",
          type: "address",
        },
        {
          internalType: "address",
          name: "currency_",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "erc20",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "usr",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "AuthTransfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "usr",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Burn",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "usr",
          type: "address",
        },
      ],
      name: "Deny",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "contractName",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "address",
          name: "addr",
          type: "address",
        },
      ],
      name: "Depend",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "usr",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Mint",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "usr",
          type: "address",
        },
      ],
      name: "Rely",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "erc20",
          type: "address",
        },
        {
          internalType: "address",
          name: "usr",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "authTransfer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "balance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "usr",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "currencyAmount",
          type: "uint256",
        },
      ],
      name: "borrow",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "currency",
      outputs: [
        {
          internalType: "contract ERC20Like",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "usr",
          type: "address",
        },
      ],
      name: "deny",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "contractName",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "addr",
          type: "address",
        },
      ],
      name: "depend",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "usr",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "x",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "y",
          type: "uint256",
        },
      ],
      name: "rdiv",
      outputs: [
        {
          internalType: "uint256",
          name: "z",
          type: "uint256",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "usr",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "currencyAmount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "tokenAmount",
          type: "uint256",
        },
      ],
      name: "redeem",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "usr",
          type: "address",
        },
      ],
      name: "rely",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "usr",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "currencyAmount",
          type: "uint256",
        },
      ],
      name: "repay",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "x",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "y",
          type: "uint256",
        },
      ],
      name: "rmul",
      outputs: [
        {
          internalType: "uint256",
          name: "z",
          type: "uint256",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "x",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "y",
          type: "uint256",
        },
      ],
      name: "safeAdd",
      outputs: [
        {
          internalType: "uint256",
          name: "z",
          type: "uint256",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "x",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "y",
          type: "uint256",
        },
      ],
      name: "safeDiv",
      outputs: [
        {
          internalType: "uint256",
          name: "z",
          type: "uint256",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "x",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "y",
          type: "uint256",
        },
      ],
      name: "safeMul",
      outputs: [
        {
          internalType: "uint256",
          name: "z",
          type: "uint256",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "x",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "y",
          type: "uint256",
        },
      ],
      name: "safeSub",
      outputs: [
        {
          internalType: "uint256",
          name: "z",
          type: "uint256",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "self",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "usr",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "currencyAmount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "tokenAmount",
          type: "uint256",
        },
      ],
      name: "supply",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "token",
      outputs: [
        {
          internalType: "contract ERC20Like",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tokenSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "wards",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
} as const;