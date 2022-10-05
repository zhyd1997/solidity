// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.4;
contract Purchase {
  uint public value;
  address payable public seller;
  address payable public buyer;

  enum State {
    Created,
    Locked,
    Release,
    Inactive
  }

  State public state;

  modifier condition(bool condition_) {
    require(condition_);
    _;
  }

  /// Only the buyer can call this function.
  error OnlyBuyer();
  /// Only the seller can call this function.
  error OnlySeller();
  /// The function cannot be called at the current state.
  error InvalidState();
  /// The provided value has to be even.
  error ValueNotEven();

  modifier onlyBuyer() {
    if (msg.sender != buyer) {
      revert OnlyBuyer();
    }
    _;
  }

  modifier onlySeller() {
    if (msg.sender != seller) {
      revert OnlySeller();
    }
    _;
  }

  modifier inState(State state_) {
    if (state != state_) {
      revert InvalidState();
    }
    _;
  }

  event Aborted();
  event PurchaseConfirmed();
  event ItemReceived();
  event SellerRefunded();

  constructor() payable {
    seller = payable(msg.sender);
    value = msg.value / 2;
    if ((2 * value) != msg.value) {
      revert ValueNotEven();
    }
  }

  function abort() external onlySeller inState(State.Created) {
    emit Aborted();
    state = State.Inactive;
    seller.transfer(address(this).balance);
  }

  function confirmPurchase() external inState(State.Created) condition(msg.value == (2 * value)) payable {
    emit PurchaseConfirmed();
    buyer = payable(msg.sender);
    state = State.Locked;
  }

  function confirmReceived() external onlyBuyer inState(State.Locked) {
    emit ItemReceived();
    state = State.Release;

    buyer.transfer(value);
  }

  function refundSeller() external onlySeller inState(State.Release) {
    emit SellerRefunded();
    state = State.Inactive;

    seller.transfer(3 * value);
  }
}
