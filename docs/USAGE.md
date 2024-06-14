# BlockPoll Usage Guide

## Prerequisites
- Node.js >= 18
- A deployed `VotingFactory` address on Polygon/Arbitrum (or your EVM testnet)
- Web3.Storage token for IPFS uploads (optional but recommended)

## Configure
1) Create `web/.env.local` with:
```
NEXT_PUBLIC_FACTORY_ADDRESS=0xYourFactoryAddress
WEB3_STORAGE_TOKEN=YourWeb3StorageToken
```
2) Install dependencies:
```
cd web && npm i
cd ../contracts && npm i
```

## Run Web App
```
cd web
npm run dev
```
Open http://localhost:3000

## Deploy Contracts
```
cd contracts
npx hardhat compile
npx hardhat run scripts/deploy.ts --network <your-network>
```
Set `NEXT_PUBLIC_FACTORY_ADDRESS` in `web/.env.local` to the printed address.

## Create a Poll
- Go to `/create`
- Enter question and options; JSON is uploaded to IPFS via `/api/ipfs` and the CID is stored on-chain

## Vote and Live Results
- Go to `/polls` to see all polls from the factory
- Open a poll; click Vote; results update live via `Voted` events
