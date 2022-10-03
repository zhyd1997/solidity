import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Coin", () => {
  const deployCoinFixture =async () => {
    const Coin = await ethers.getContractFactory('Coin');
    const coin = await Coin.deploy();

    const [ owner, otherAccount ] = await ethers.getSigners();

    return { coin, owner, otherAccount };
  }

  it("Should mint", async () => {
    const { coin, owner, otherAccount } = await loadFixture(deployCoinFixture);

    console.log(await coin.minter());

    await coin.mint(owner.address, 100);

    await expect(coin.connect(otherAccount).send(owner.address, 1000)).to.revertedWithCustomError(coin, 'InsufficientBalance');

    await expect(
      coin.send(otherAccount.address, 1))
      .to.emit(coin, 'Sent')
      .withArgs(owner.address, otherAccount.address, 1);
  });
});
