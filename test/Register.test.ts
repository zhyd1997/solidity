import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Register", () => {
  const deployRegisterFixture = async () => {
    const Register = await ethers.getContractFactory("Register");
    const register = await Register.deploy(1);

    const [ _, otherAccounts ] = await ethers.getSigners();

    return { register, otherAccounts };
  };

  it("register", async () => {
    const { register } = await loadFixture(deployRegisterFixture);

    await register.register({ value: 2 });
  });

  it("changePrice successfully with owner", async () => {
    const { register } = await loadFixture(deployRegisterFixture);

    await register.changePrice(2);
  });

  it("changePrice failure with other account", async () => {
    const { register, otherAccounts } = await loadFixture(deployRegisterFixture);

    await expect(register.connect(otherAccounts).changePrice(2)).to.be.revertedWith("Only owner can call this funciton.");
  });
});

describe("MuteX", () => {
  const deployMuteXFixture = async () => {
    const MuteX = await ethers.getContractFactory("MuteX");
    const muteX = await MuteX.deploy();

    return { muteX };
  };

  it("reentrancy call", async () => {
    const { muteX } = await loadFixture(deployMuteXFixture);

    await muteX.f();
  });
});
