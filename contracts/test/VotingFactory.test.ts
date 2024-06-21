import { expect } from "chai";
import { ethers } from "hardhat";

describe("VotingFactory", () => {
  it("creates polls and stores addresses", async () => {
    const Factory = await ethers.getContractFactory("VotingFactory");
    const factory = await Factory.deploy();
    await factory.waitForDeployment();

    const now = (await ethers.provider.getBlock("latest")).timestamp;
    const tx = await factory.createPoll("ipfs://cid", ["X", "Y"], now + 3600);
    const receipt = await tx.wait();
    const polls = await factory.allPolls();
    expect(polls.length).to.equal(1);
    expect(polls[0]).to.properAddress;
  });
});


