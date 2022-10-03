import hre from 'hardhat';
import { expect } from 'chai';

describe('Storage', () => {
  it('Should get storedData', async () => {
    const Storage = await hre.ethers.getContractFactory('SimpleStorage');

    const storage = await Storage.deploy();

    await storage.set(4);

    expect(await storage.get()).to.equal(4);
  });
});
