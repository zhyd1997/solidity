import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Overloading", () => {
  const deployOverloadingFixture = async () => {
    const Overloading = await ethers.getContractFactory("A");
    const overloading = await Overloading.deploy();

    return { overloading };
  };

  it("f(uint8)", async () => {
    const { overloading } = await loadFixture(deployOverloadingFixture);

    expect(await overloading["f(uint8)"](5)).to.be.equal(5);
  });

  it("f(uint)", async () => {
    const { overloading } = await loadFixture(deployOverloadingFixture);

    expect(await overloading["f(uint256)"](256)).to.be.equal(256);
  });
});
