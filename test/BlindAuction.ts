import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("BlindAuction", () => {
  const deployBlindAuctionFixture =async () => {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const biddingTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    const revealTime = (await time.latest()) + ONE_YEAR_IN_SECS * 2;

    const [ owner, otherAccount ] = await ethers.getSigners();

    const BlindAuction = await ethers.getContractFactory("BlindAuction");
    const blindAuction = await BlindAuction.deploy(biddingTime, revealTime, otherAccount.address);

    return { owner, otherAccount, blindAuction };
  }

  it("bid", async () => {
    await loadFixture(deployBlindAuctionFixture);
  })
});
