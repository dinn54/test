import { IContractInformation } from '../types'

export const CLINGEVENT_INFO: IContractInformation = {
  abi: [
    {
      inputs: [
        { internalType: 'address', name: '_transferAdmin', type: 'address' },
      ],
      name: 'changeAdmin',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
          ],
          internalType: 'struct ClingEvent.EventTransferRequest[]',
          name: '_transferInfo',
          type: 'tuple[]',
        },
      ],
      name: 'doEventTransfer',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_admin', type: 'address' },
        { internalType: 'address', name: '_transferAdmin', type: 'address' },
        { internalType: 'address', name: '_token', type: 'address' },
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
          name: 'from',
          type: 'address',
        },
        { indexed: true, internalType: 'address', name: 'to', type: 'address' },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'eventTransfer',
      type: 'event',
    },
    {
      inputs: [],
      name: 'admin',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'token',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'transferAdmin',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
  ],
  address: {
    dev: null,
    stg: '0x05155f5C517A86baAF1cf91254b20919c345fC47',
    prod: '0x6D52583373BA8D0E3D695A2f8a1F5eFE9F06765E',
  },
}
