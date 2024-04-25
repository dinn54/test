import { IContractInformation } from '../types'

export const CVNFT_TOKENROUTER_INFO: IContractInformation = {
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'previousAdmin',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'newAdmin',
          type: 'address',
        },
      ],
      name: 'AdminChanged',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'beacon',
          type: 'address',
        },
      ],
      name: 'BeaconUpgraded',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint8',
          name: 'version',
          type: 'uint8',
        },
      ],
      name: 'Initialized',
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
          indexed: true,
          internalType: 'address',
          name: 'implementation',
          type: 'address',
        },
      ],
      name: 'Upgraded',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'string',
          name: 'messageId',
          type: 'string',
        },
        {
          indexed: true,
          internalType: 'string',
          name: 'ownerUid',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'addTokenFail',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'string',
          name: 'messageId',
          type: 'string',
        },
        {
          indexed: true,
          internalType: 'string',
          name: 'ownerUid',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'offGameTokenFail',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'tokenContract',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'string',
          name: 'ownerUid',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'onGameToken',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'string',
          name: 'messageId',
          type: 'string',
        },
        {
          indexed: true,
          internalType: 'string',
          name: 'ownerUid',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'removeTokenFail',
      type: 'event',
    },
    {
      inputs: [
        { internalType: 'address', name: '_tokenContract', type: 'address' },
        { internalType: 'string', name: '_ownerUid', type: 'string' },
        { internalType: 'uint256', name: '_amount', type: 'uint256' },
      ],
      name: 'canRemoveToken',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'address', name: 'tokenContract', type: 'address' },
            { internalType: 'string', name: 'messageId', type: 'string' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
            { internalType: 'string', name: 'ownerUid', type: 'string' },
            { internalType: 'uint256', name: 'txFee', type: 'uint256' },
          ],
          internalType: 'struct ManageTokenRouter.AddAndRemoveTokenRequest[]',
          name: '_request',
          type: 'tuple[]',
        },
      ],
      name: 'doAddToken',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'address', name: 'tokenContract', type: 'address' },
            { internalType: 'string', name: 'messageId', type: 'string' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
            { internalType: 'address', name: 'owner', type: 'address' },
            { internalType: 'string', name: 'ownerUid', type: 'string' },
            { internalType: 'uint256', name: 'txFee', type: 'uint256' },
          ],
          internalType: 'struct ManageTokenRouter.OffGameTokenRequest[]',
          name: '_request',
          type: 'tuple[]',
        },
      ],
      name: 'doOffGameToken',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_tokenContract', type: 'address' },
        { internalType: 'uint256', name: '_amount', type: 'uint256' },
        { internalType: 'string', name: '_ownerUid', type: 'string' },
      ],
      name: 'doOnGameToken',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'address', name: 'tokenContract', type: 'address' },
            { internalType: 'string', name: 'messageId', type: 'string' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
            { internalType: 'string', name: 'ownerUid', type: 'string' },
            { internalType: 'uint256', name: 'txFee', type: 'uint256' },
          ],
          internalType: 'struct ManageTokenRouter.AddAndRemoveTokenRequest[]',
          name: '_request',
          type: 'tuple[]',
        },
      ],
      name: 'doRemoveToken',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'factroy',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_tokenContract', type: 'address' },
        { internalType: 'string', name: '_ownerUid', type: 'string' },
      ],
      name: 'getOnGameBalanceToken',
      outputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_factory', type: 'address' },
        { internalType: 'address[]', name: '_relayAdmin', type: 'address[]' },
      ],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'proxiableUUID',
      outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'relayAdmin',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
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
        { internalType: 'address[]', name: '_relayAdmin', type: 'address[]' },
        { internalType: 'uint256', name: '_type', type: 'uint256' },
      ],
      name: 'setRelayAdmin',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'newImplementation', type: 'address' },
      ],
      name: 'upgradeTo',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'newImplementation', type: 'address' },
        { internalType: 'bytes', name: 'data', type: 'bytes' },
      ],
      name: 'upgradeToAndCall',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
  ],
  address: {
    dev: null,
    stg: '0xe9fC9d8028b07Ea85B72D05376D0A57f0751F216',
    prod: '0x109B051E9332de9385CB6De77fEcF758d64D10F8',
  },
}
