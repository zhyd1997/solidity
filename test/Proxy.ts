import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Proxy", () => {
  const deployProxyFixture = async () => {
    const Proxy = await ethers.getContractFactory("Proxy");

    const [ owner, _ ] = await ethers.getSigners();

    const proxy = await Proxy.deploy(owner.address);

    return { proxy };
  };

  it("forward", async () => {
    const { proxy } = await loadFixture(deployProxyFixture);

    // [1, 2, 3, 4]
    const payload = ethers.utils.arrayify(0x01020304);

    await proxy.forward(payload);
  });
});
