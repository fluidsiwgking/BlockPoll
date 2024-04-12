import { ethers } from "hardhat";

async function main() {
  const Factory = await ethers.getContractFactory("VotingFactory");
  const factory = await Factory.deploy();
  await factory.waitForDeployment();
  console.log("VotingFactory deployed at:", await factory.getAddress());
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});


