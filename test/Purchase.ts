import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

enum State {
  Created,
  Locked,
  Release,
  Inactive
};

describe("Purchase", () => {
  const deployPurchaseFixure = async () => {
    const Purchase = await ethers.getContractFactory("Purchase");
    const purchase = await Purchase.deploy({ value: 2 });

    const [ owner, otherAccount ] = await ethers.getSigners();

    return { Purchase, purchase, owner, otherAccount };
  }

  it("should be reverted with ValueNotEven", async () => {
    const { Purchase, purchase } = await loadFixture(deployPurchaseFixure);

    await expect(Purchase.deploy({ value: 1 })).to.be.revertedWithCustomError(purchase, "ValueNotEven");
  });

  describe("abort", () => {
    it("should emit Aborted event", async () => {
      const { purchase } = await loadFixture(deployPurchaseFixure);
  
      await expect(purchase.abort()).to.emit(purchase, "Aborted").withArgs();
    });

    it("should change seller ether balance",async () => {
      const { purchase, owner: seller } = await loadFixture(deployPurchaseFixure);
  
      await expect(purchase.abort()).to.changeEtherBalance(seller, 2);
    })
  });

  describe("confirmPurchase", () => {
    it("should emit PurchaseConfirmed event", async () => {
      const { purchase, otherAccount: buyer } = await loadFixture(deployPurchaseFixure);

      await expect(purchase.connect(buyer).confirmPurchase({ value: 2 })).to.emit(purchase, "PurchaseConfirmed").withArgs();

      expect(await purchase.state()).to.equal(State.Locked);

      expect(await purchase.buyer()).to.equal(buyer.address);
    });
  });

  describe("confirmReceived", () => {
    it("should be reverted with OnlyBuyer when msg.sender is seller", async () => {
      const { purchase, owner, otherAccount: buyer } = await loadFixture(deployPurchaseFixure);

      expect(await purchase.seller()).to.equal(owner.address);

      await expect(purchase.confirmReceived()).to.revertedWithCustomError(purchase, "OnlyBuyer");
    });

    it("should emit ItemReceived event", async () => {
      const { purchase, owner: seller, otherAccount: buyer } = await loadFixture(deployPurchaseFixure);

      await purchase.connect(buyer).confirmPurchase({ value: 2 });

      expect(await purchase.state()).to.equal(State.Locked);

      await expect(purchase.connect(buyer).confirmReceived()).to.emit(purchase, "ItemReceived").withArgs();

      expect(await purchase.state()).to.equal(State.Release);
    });

    it("should change buyer's balance but not seller's balance", async () => {
      const { purchase, owner: seller, otherAccount: buyer } = await loadFixture(deployPurchaseFixure);

      await purchase.connect(buyer).confirmPurchase({ value: 2 });

      await expect(purchase.connect(buyer).confirmReceived()).to.changeEtherBalances([buyer, seller], [1, 0]);
    })
  });

  describe("refundSeller", () => {
    it("should be reverted with OnlySeller when msg.sender is buyer", async () => {
      const { purchase, owner, otherAccount: buyer } = await loadFixture(deployPurchaseFixure);

      expect(await purchase.seller()).to.equal(owner.address);

      await purchase.connect(buyer).confirmPurchase({ value: 2 });

      await purchase.connect(buyer).confirmReceived();

      await expect(purchase.connect(buyer).refundSeller()).to.revertedWithCustomError(purchase, "OnlySeller");
    });

    it("should be reverted with InvalidState when state is not Release", async () => {
      const { purchase, owner, otherAccount: buyer } = await loadFixture(deployPurchaseFixure);

      expect(await purchase.state()).to.equal(State.Created);

      expect(await purchase.seller()).to.equal(owner.address);

      await expect(purchase.refundSeller()).to.revertedWithCustomError(purchase, "InvalidState");
    });

    it("should emit SellerRefunded event", async () => {
      const { purchase, owner: seller, otherAccount: buyer } = await loadFixture(deployPurchaseFixure);

      await purchase.connect(buyer).confirmPurchase({ value: 2 });

      await purchase.connect(buyer).confirmReceived();

      await expect(purchase.refundSeller()).to.emit(purchase, "SellerRefunded").withArgs();

      expect(await purchase.state()).to.equal(State.Inactive);
    });

    it("should change seller's balance but not buyer's balance", async () => {
      const { purchase, owner: seller, otherAccount: buyer } = await loadFixture(deployPurchaseFixure);

      await purchase.connect(buyer).confirmPurchase({ value: 2 });

      await purchase.connect(buyer).confirmReceived();

      await expect(purchase.refundSeller()).to.changeEtherBalances([buyer, seller], [0, 3]);
    });
  });
});
