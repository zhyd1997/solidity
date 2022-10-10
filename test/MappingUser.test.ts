import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("MappingUser", () => {
  const deployMappingExampleFixture = async () => {
    const MappingUser = await ethers.getContractFactory("MappingUser");
    const mappingUser = await MappingUser.deploy();

    return { mappingUser };
  };

  it("MappingExample", async () => {
    const { mappingUser } = await loadFixture(deployMappingExampleFixture);

    expect(await mappingUser.f()).to.equal(100);
  });
});
