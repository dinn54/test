import { IContractInformation } from '../types'

export const FANDOMSHOP_INFO: IContractInformation = {
  abi: [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'paymentTokenAddress',
          type: 'address',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferStarted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'Paused',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'buyer',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'itemId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'purchasedItemPrice',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'purchaseId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'uid',
          type: 'string',
        },
      ],
      name: 'PurchaseItemSuccess',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'refundedAddress',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'referenceId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'purchasedId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'refundedAmount',
          type: 'uint256',
        },
      ],
      name: 'RefundItemSuccess',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'TransferTreasury',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'Unpaused',
      type: 'event',
    },
    {
      stateMutability: 'payable',
      type: 'fallback',
    },
    {
      inputs: [],
      name: 'acceptOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'accumulatedPurchaseAmount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'accumulatedRefundAmount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'accumulatedTreasuryAmount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'purchaseId',
          type: 'uint256',
        },
      ],
      name: 'getPurchaseHistoryByPurchaseId',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'purchaseId',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'itemId',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'purchasedItemPrice',
              type: 'uint256',
            },
            {
              internalType: 'address',
              name: 'buyer',
              type: 'address',
            },
            {
              internalType: 'string',
              name: 'uid',
              type: 'string',
            },
          ],
          internalType: 'struct FandomShop.PurchaseHistory',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'itemId',
          type: 'uint256',
        },
      ],
      name: 'isPurchasedItem',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'pause',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'paused',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'pendingOwner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
      ],
      name: 'purchaseHistoryOf',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'purchaseId',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'itemId',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'purchasedItemPrice',
              type: 'uint256',
            },
            {
              internalType: 'address',
              name: 'buyer',
              type: 'address',
            },
            {
              internalType: 'string',
              name: 'uid',
              type: 'string',
            },
          ],
          internalType: 'struct FandomShop.PurchaseHistory[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
      ],
      name: 'purchaseIdOf',
      outputs: [
        {
          internalType: 'uint256[]',
          name: '',
          type: 'uint256[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'uid',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'itemId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'purchaseItemPrice',
          type: 'uint256',
        },
      ],
      name: 'purchaseItem',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'refundId',
          type: 'uint256',
        },
      ],
      name: 'refundHistoryOf',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'refundId',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'refundTime',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'refundedItemPrice',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'purchaseId',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'itemId',
              type: 'uint256',
            },
            {
              internalType: 'address',
              name: 'buyer',
              type: 'address',
            },
            {
              internalType: 'string',
              name: 'uid',
              type: 'string',
            },
          ],
          internalType: 'struct FandomShop.RefundHistory',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
      ],
      name: 'refundIdOf',
      outputs: [
        {
          internalType: 'uint256[]',
          name: '',
          type: 'uint256[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'purchaseId',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'buyer',
          type: 'address',
        },
        {
          internalType: 'string',
          name: 'uid',
          type: 'string',
        },
      ],
      name: 'refundItem',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
      ],
      name: 'transferTreasury',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'treasuryAmount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'unPause',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      stateMutability: 'payable',
      type: 'receive',
    },
  ],
  address: {
    dev: null,
    stg: '0x54443794AFdf979e02Fc6fab3f7BB0be3EE9eF99',
    prod: '0x52E27c34851210E0e903426C641129fF2c8FCA1A',
  },
}
