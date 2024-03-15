export const votingPollAbi = [
  {
    type: "function",
    name: "getOptions",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "string[]" }],
  },
  {
    type: "function",
    name: "getCounts",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "counts", type: "uint256[]" }],
  },
  {
    type: "function",
    name: "vote",
    stateMutability: "nonpayable",
    inputs: [{ name: "optionIndex", type: "uint256" }],
    outputs: [],
  },
  {
    type: "function",
    name: "questionUri",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
  },
  {
    type: "function",
    name: "deadline",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "event",
    name: "Voted",
    inputs: [
      { name: "voter", type: "address", indexed: true },
      { name: "optionIndex", type: "uint256", indexed: false },
      { name: "newCount", type: "uint256", indexed: false },
    ],
    anonymous: false,
  },
];

export const votingFactoryAbi = [
  {
    type: "function",
    name: "createPoll",
    stateMutability: "nonpayable",
    inputs: [
      { name: "questionUri", type: "string" },
      { name: "options", type: "string[]" },
      { name: "deadline", type: "uint256" },
    ],
    outputs: [{ name: "poll", type: "address" }],
  },
  {
    type: "function",
    name: "allPolls",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address[]" }],
  },
  {
    type: "event",
    name: "PollCreated",
    inputs: [
      { name: "creator", type: "address", indexed: true },
      { name: "poll", type: "address", indexed: false },
      { name: "questionUri", type: "string", indexed: false },
      { name: "deadline", type: "uint256", indexed: false },
    ],
    anonymous: false,
  },
];


