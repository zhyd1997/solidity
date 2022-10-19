import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Tree", () => {
  const deployTreeFixture = async () => {
    const Tree = await ethers.getContractFactory("Tree");
    const tree = await Tree.deploy();

    return { tree };
  };

  it("age", async () => {
    const { tree } = await loadFixture(deployTreeFixture);

    expect(await tree.age(1)).to.be.equal(2);
  });

  it("leaves", async () => {
    const { tree } = await loadFixture(deployTreeFixture);

    expect(await tree.leaves()).to.be.equal(2);
  });
});

describe("Plant", () => {
  const deployPlantFixture = async () => {
    const Plant = await ethers.getContractFactory("Plant");
    const plant = await Plant.deploy();

    return { plant };
  };

  it("age", async () => {
    const { plant } = await loadFixture(deployPlantFixture);

    expect(await plant.leaves()).to.be.equal(3);
  });
});

describe("KumquatTree", () => {
  const deployKumquatTreeFixture = async () => {
    const KumquatTree = await ethers.getContractFactory("KumquatTree");
    const kumquatTree = await KumquatTree.deploy();

    return { kumquatTree };
  };

  it("age", async () => {
    const { kumquatTree } = await loadFixture(deployKumquatTreeFixture);

    expect(await kumquatTree.age(2)).to.be.equal(4);
  });

  it("leaves", async () => {
    const { kumquatTree } = await loadFixture(deployKumquatTreeFixture);

    expect(await kumquatTree.leaves()).to.be.equal(3);
  })
});
