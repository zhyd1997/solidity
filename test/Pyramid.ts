import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Pyramid", () => {
  const deployPyramidFixture = async () => {
    const Pyramid = await ethers.getContractFactory("Pyramid");
    const pyramid = await Pyramid.deploy();

    return { pyramid };
  };

  it("pyramid", async () => {
    const { pyramid } = await loadFixture(deployPyramidFixture);

    expect(await pyramid.pyramid(3)).to.equal(5);
  });
});
