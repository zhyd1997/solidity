import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("SimpleAuction", () => {
  const deploySimpleAuctionFixture = async () => {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;

    const SimpleAuction = await ethers.getContractFactory("SimpleAuction");

    const [ owner, otherAccount ] = await ethers.getSigners();

    const biddingTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    const simpleAuction = await SimpleAuction.deploy(biddingTime, otherAccount.address);

    return { owner, otherAccount, simpleAuction, biddingTime };
  }

  it("bid", async () => {
    const{ owner, simpleAuction } = await loadFixture(deploySimpleAuctionFixture);

    expect(await simpleAuction.highestBid()).to.equal(0);

    await expect(simpleAuction.bid({ value: 1}))
      .to.emit(simpleAuction, "HighestBidIncreased")
      .withArgs(owner.address, 1);
  });

  it('withdraw',async () => {
    const{ owner, simpleAuction } = await loadFixture(deploySimpleAuctionFixture);

    await simpleAuction.withdraw();
  })

  it("auctionEnd",async () => {
    const{ owner, simpleAuction } = await loadFixture(deploySimpleAuctionFixture);

    await expect(simpleAuction.auctionEnd()).to.revertedWithCustomError(simpleAuction, "AuctionNotYetEnded");
  })
});
