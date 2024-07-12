import { expect } from "chai";
import { ethers } from "hardhat";

describe("VotingPoll edge cases", () => {
  it("reverts when voting after deadline", async () => {
    const Poll = await ethers.getContractFactory("VotingPoll");
    const now = (await ethers.provider.getBlock("latest")).timestamp;
    const poll = await Poll.deploy("ipfs://demo", ["A", "B"], now + 1);
    await poll.waitForDeployment();
    await ethers.provider.send("evm_increaseTime", [120]);
    await ethers.provider.send("evm_mine", []);
    await expect(poll.vote(0)).to.be.revertedWith("ended");
  });

  it("reverts for out-of-range option index", async () => {
    const Poll = await ethers.getContractFactory("VotingPoll");
    const now = (await ethers.provider.getBlock("latest")).timestamp;
    const poll = await Poll.deploy("ipfs://demo", ["A", "B"], now + 3600);
    await poll.waitForDeployment();
    await expect(poll.vote(5)).to.be.revertedWith("bad index");
  });
});


