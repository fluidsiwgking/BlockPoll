import { expect } from "chai";
import { ethers } from "hardhat";

describe("VotingPoll", () => {
  it("prevents double voting and tallies counts", async () => {
    const [owner, user] = await ethers.getSigners();
    const Poll = await ethers.getContractFactory("VotingPoll");
    const now = (await ethers.provider.getBlock("latest")).timestamp;
    const poll = await Poll.deploy("ipfs://demo", ["A", "B", "C"], now + 3600);
    await poll.waitForDeployment();

    await expect(poll.connect(user).vote(1)).to.emit(poll, "Voted").withArgs(user.address, 1, 1);
    await expect(poll.connect(user).vote(1)).to.be.revertedWith("already");

    const counts = await poll.getCounts();
    expect(counts[0]).to.equal(0n);
    expect(counts[1]).to.equal(1n);
    expect(counts[2]).to.equal(0n);
  });
});


