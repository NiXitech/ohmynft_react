export const ABIData = [
  {
    inputs: [
      { internalType: "address", name: "_vrfCoordinator", type: "address" },
      { internalType: "address", name: "_linkToken", type: "address" },
      { internalType: "bytes32", name: "_keyHash", type: "bytes32" },
      { internalType: "bool", name: "_mainetFee", type: "bool" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "raffleId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountRaised",
        type: "uint256",
      },
    ],
    name: "EarlyCashoutTriggered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "raffleId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "currentSize",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "priceStructureId",
        type: "uint256",
      },
    ],
    name: "EntrySold",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "raffleId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountTransferred",
        type: "uint256",
      },
    ],
    name: "FeeTransferredToPlatform",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "raffleId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "buyer",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "currentSize",
        type: "uint256",
      },
    ],
    name: "FreeEntry",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "raffleId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountRaised",
        type: "uint256",
      },
    ],
    name: "RaffleCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "raffleId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
    ],
    name: "RaffleCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "raffleId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountRaised",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "randomNumber",
        type: "uint256",
      },
    ],
    name: "RaffleEnded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "raffleId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
    ],
    name: "RaffleStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "idFromMetawin",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "randomNumber",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "normalizedRandomNumber",
        type: "uint256",
      },
    ],
    name: "RandomNumberCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "raffleId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountInWeis",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "Refund",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "raffleId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountInWeis",
        type: "uint256",
      },
    ],
    name: "RemainingFundsTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "raffleId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountRaised",
        type: "uint256",
      },
    ],
    name: "SetWinnerTriggered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "raffleId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newStatus",
        type: "uint256",
      },
    ],
    name: "StatusChangedInEmergency",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "OPERATOR_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_raffleId", type: "uint256" },
      { internalType: "uint256", name: "_id", type: "uint256" },
      { internalType: "address", name: "_collection", type: "address" },
      { internalType: "uint256", name: "_tokenIdUsed", type: "uint256" },
    ],
    name: "buyEntry",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_raffleId", type: "uint256" }],
    name: "cancelRaffle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "chainlinkRaffleInfo",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "uint256", name: "size", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_raffleId", type: "uint256" }],
    name: "claimRefund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "claimsData",
    outputs: [
      { internalType: "uint256", name: "numEntriesPerUser", type: "uint256" },
      { internalType: "uint256", name: "amountSpentInWeis", type: "uint256" },
      { internalType: "bool", name: "claimed", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_desiredFundsInWeis", type: "uint256" },
      { internalType: "uint256", name: "_maxEntriesPerUser", type: "uint256" },
      { internalType: "address", name: "_collateralAddress", type: "address" },
      { internalType: "uint256", name: "_collateralId", type: "uint256" },
      { internalType: "uint256", name: "_minimumFundsInWeis", type: "uint256" },
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "uint256", name: "numEntries", type: "uint256" },
          { internalType: "uint256", name: "price", type: "uint256" },
        ],
        internalType: "struct Manager.PriceStructure[]",
        name: "_prices",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "_commissionInBasicPoints",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_collectionWhitelist",
        type: "address[]",
      },
    ],
    name: "createRaffle",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "destinationWallet",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_raffleId", type: "uint256" }],
    name: "earlyCashOut",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "entriesList",
    outputs: [
      {
        internalType: "uint256",
        name: "currentEntriesLength",
        type: "uint256",
      },
      { internalType: "address", name: "player", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "fundingList",
    outputs: [
      { internalType: "uint256", name: "minimumFundsInWeis", type: "uint256" },
      { internalType: "uint256", name: "desiredFundsInWeis", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_raffleId", type: "uint256" },
      { internalType: "address", name: "_player", type: "address" },
    ],
    name: "getClaimData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "numEntriesPerUser",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountSpentInWeis",
            type: "uint256",
          },
          { internalType: "bool", name: "claimed", type: "bool" },
        ],
        internalType: "struct Manager.ClaimStruct",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_raffleId", type: "uint256" }],
    name: "getEntriesBought",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "currentEntriesLength",
            type: "uint256",
          },
          { internalType: "address", name: "player", type: "address" },
        ],
        internalType: "struct Manager.EntriesBought[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_raffleId", type: "uint256" },
      {
        internalType: "uint256",
        name: "_normalizedRandomNumber",
        type: "uint256",
      },
    ],
    name: "getWinnerAddressFromRandom",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_raffleId", type: "uint256" },
      { internalType: "address[]", name: "_freePlayers", type: "address[]" },
    ],
    name: "giveBatchEntriesForFree",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "prices",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "uint256", name: "numEntries", type: "uint256" },
      { internalType: "uint256", name: "price", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "raffles",
    outputs: [
      { internalType: "enum Manager.STATUS", name: "status", type: "uint8" },
      { internalType: "uint256", name: "maxEntries", type: "uint256" },
      { internalType: "address", name: "collateralAddress", type: "address" },
      { internalType: "uint256", name: "collateralId", type: "uint256" },
      { internalType: "address", name: "winner", type: "address" },
      { internalType: "uint256", name: "randomNumber", type: "uint256" },
      { internalType: "uint256", name: "amountRaised", type: "uint256" },
      { internalType: "address", name: "seller", type: "address" },
      { internalType: "uint256", name: "platformPercentage", type: "uint256" },
      { internalType: "uint256", name: "entriesLength", type: "uint256" },
      { internalType: "uint256", name: "cancellingDate", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "requestId", type: "bytes32" },
      { internalType: "uint256", name: "randomness", type: "uint256" },
    ],
    name: "rawFulfillRandomness",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "requests",
    outputs: [
      { internalType: "uint256", name: "randomNumber", type: "uint256" },
      {
        internalType: "uint256",
        name: "nomalizedRandomNumber",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "requiredNFTWallets",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address payable", name: "_newAddress", type: "address" },
    ],
    name: "setDestinationAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_raffleId", type: "uint256" }],
    name: "setWinner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_raffleId", type: "uint256" }],
    name: "stakeNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_raffleId", type: "uint256" }],
    name: "transferRemainingFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
