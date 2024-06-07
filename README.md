# BlockPoll

A decentralized polling and survey platform where creators publish on-chain polls and voters participate with wallet identities. Results are transparent, tamper-evident, and verifiable.

## Features
- Wallet-based auth (MetaMask, WalletConnect)
- One-address-one-vote enforcement on-chain
- Real-time results from chain events
- Poll creation with single/multiple choice and deadlines
- Off-chain IPFS storage for question text and options

## Tech Stack
- Frontend: React + Next.js, wagmi, RainbowKit
- Smart contracts: Solidity (VotingFactory, VotingPoll) on EVM chains (Polygon/Arbitrum)
- Storage: IPFS for large text
- Tooling: Hardhat, TypeScript, ESLint, Jest/ViTest

## Getting Started

Environment variables:
- `NEXT_PUBLIC_FACTORY_ADDRESS`: Deployed `VotingFactory` address
- `WEB3_STORAGE_TOKEN`: Token for uploading JSON to Web3.Storage (used by `/api/ipfs`)

Install and run:
```bash
cd contracts && npm i && cd ..
cd web && npm i && npm run dev
```

Deploy contracts (example local or testnet):
```bash
cd contracts
npx hardhat compile
npx hardhat run scripts/deploy.ts --network <your-network>
```

Then set the `NEXT_PUBLIC_FACTORY_ADDRESS` in `web/.env.local`.

## Monorepo Layout
- /web: Next.js dApp
- /contracts: Solidity smart contracts + tests
- /scripts: automation utilities
- /docs: additional documentation

## Security
- Transparent and auditable contract logic
- Anti-double-vote enforced by contract
- Optional privacy extensions (ZK) in roadmap

## License
MIT
