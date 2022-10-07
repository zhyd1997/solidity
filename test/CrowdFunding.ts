import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("CrowdFunding", () => {
  const deployCrowdFundingFixture = async () => {
    const CrowdFunding = await ethers.getContractFactory("CrowdFunding");
    const crowdFunding = await CrowdFunding.deploy();

    const [ owner, otherAccount ] = await ethers.getSigners();

    return { crowdFunding, owner, otherAccount };
  };

  it("newCampaign", async () => {
    const { crowdFunding, owner, otherAccount } = await loadFixture(deployCrowdFundingFixture);

    await crowdFunding.newCampaign(otherAccount.address, 10);
  });

  it("contribute", async () => {
    const { crowdFunding, owner, otherAccount } = await loadFixture(deployCrowdFundingFixture);

    await crowdFunding.newCampaign(otherAccount.address, 10);

    await crowdFunding.contribute(1, { value: 20 });
  });

  it("checkGoalReached", async () => {
    const { crowdFunding, owner, otherAccount } = await loadFixture(deployCrowdFundingFixture);

    await crowdFunding.checkGoalReached(1);
  });
});
