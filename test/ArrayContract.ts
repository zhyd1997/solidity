import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("ArrayContract", () => {
  const deployArrayContractFixture = async () => {
    const ArrayContract = await ethers.getContractFactory("ArrayContract");
    const arrayContract = await ArrayContract.deploy();

    return { arrayContract };
  };

  it("addFlag", async () => {
    const { arrayContract } = await loadFixture(deployArrayContractFixture);

    // await arrayContract.setAllFlagPairs([[false, true], [true, false]]);

    await arrayContract.addFlag([false, true]);
  });

  it("createMemoryArray", async () => {
    const { arrayContract } = await loadFixture(deployArrayContractFixture);

    await arrayContract.createMemoryArray(2);
  })
});
