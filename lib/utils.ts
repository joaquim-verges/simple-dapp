export const shorten = (address: string | undefined) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
};

export const GREETER_ABI = [
  {
    type: 'constructor',
    name: '',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'GreetingChange',
    inputs: [
      {
        type: 'address',
        name: 'greetingSetter',
        indexed: true,
        internalType: 'address',
      },
      {
        type: 'string',
        name: 'newGreeting',
        indexed: false,
        internalType: 'string',
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: 'function',
    name: 'greeting',
    inputs: [],
    outputs: [
      {
        type: 'string',
        name: '',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'setGreeting',
    inputs: [
      {
        type: 'string',
        name: '_newGreeting',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
] as const;
