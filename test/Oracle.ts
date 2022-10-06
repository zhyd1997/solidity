import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("OracleUser", () => {
  const deployOracleUserFixture = async () => {
    const Oracle = await ethers.getContractFactory("Oracle");
    const oracle = await Oracle.deploy();

    const OracleUser = await ethers.getContractFactory("OracleUser");
    const oracleUser = await OracleUser.deploy(oracle.address);

    return { oracleUser };
  };

  it("should be reverted with 'Only oracle can call this.", async () => {
    const { oracleUser } =  await loadFixture(deployOracleUserFixture);

    expect(await oracleUser.buySomething()).to.be.revertedWith('Only oracle can call this.');
  });
});
