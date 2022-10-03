import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe("Ballot", () => {
  const deployBallotFixture =async () => {
    const Ballot = await ethers.getContractFactory("Ballot");

    const abiCoder = ethers.utils.defaultAbiCoder;

    const proposals = abiCoder.encode(["bytes32[]"], [['foo', 'bar']]);

    const ballot = await Ballot.deploy(['foo', 'bar']);

    const [ owner, otherAccount ] = await ethers.getSigners();

    return { ballot, owner, otherAccount };
  }

  it("shuold give right to vote", async () => {
    const { ballot, owner, otherAccount } = await loadFixture(deployBallotFixture);

    expect(await ballot.chairperson()).to.equal(owner.address);

    expect((await ballot.voters(owner.address)).weight).to.equal(1);

    await ballot.giveRightToVote(otherAccount.address);

    expect((await ballot.voters(otherAccount.address)).weight).to.equal(1);
  });

  it.only("should return winner name",async () => {
    const { ballot, owner, otherAccount } = await loadFixture(deployBallotFixture);

    await ballot.giveRightToVote(otherAccount.address);

    await ballot.vote(1);

    await ballot.connect(otherAccount.address).vote(1);

    expect(await ballot.winnerName()).to.equal('foo');
  })
});
