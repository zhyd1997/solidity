import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

enum ActionChoices {
  GoLeft,
  GoRight,
  GoStraight,
  SitStill
}

describe("EnumPractice", () => {
  const deployEnumPracticeFixture = async () => {
    const EnumPractice = await ethers.getContractFactory("EnumPractice");
    const enumPractice = await EnumPractice.deploy();

    return { enumPractice };
  };

  it("setGoStraight", async () => {
    const { enumPractice } = await loadFixture(deployEnumPracticeFixture);

    await enumPractice.setGoStraight();

    expect(await enumPractice.getChoice()).to.equal(ActionChoices.GoStraight);
  });

  it("getChoice", async () => {
    const { enumPractice } = await loadFixture(deployEnumPracticeFixture);

    expect(await enumPractice.getChoice()).to.equal(ActionChoices.GoLeft);
  });

  it("getDefaultChoice", async () => {
    const { enumPractice } = await loadFixture(deployEnumPracticeFixture);

    expect(await enumPractice.getDefaultChoice()).to.equal(ActionChoices.GoStraight);
  });

  it("getLargestValue", async () => {
    const { enumPractice } = await loadFixture(deployEnumPracticeFixture);

    expect(await enumPractice.getLargestValue()).to.equal(ActionChoices.SitStill);
  });

  it("getSmallestValue", async () => {
    const { enumPractice } = await loadFixture(deployEnumPracticeFixture);

    expect(await enumPractice.getSmallestValue()).to.equal(ActionChoices.GoLeft);
  });
});
