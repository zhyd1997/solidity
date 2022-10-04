// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.4;

contract SimpleAuction {
  address payable public beneficiary;
  uint public auctionEndTime;

  constructor(
    uint biddingTime,
    address payable beneficiaryAddress
  ) {
    beneficiary = beneficiaryAddress;
    auctionEndTime = block.timestamp + biddingTime;
  }

  address public highestBidder;
  uint public highestBid;

  mapping (address => uint) pendingReturns;

  bool ended;

  event HighestBidIncreased(address bidder, uint amount);
  event AuctionEnded(address winner, uint amount);

  /// the auction has already ended.
  error AuctionAlreadyEnded();
  /// there is already a higher or equal bid.
  error BidNotHighEnough(uint highestBid);
  /// the auction has not ended yet.
  error AuctionNotYetEnded();
  /// the function auctionEnd has already been called.
  error AuctionEndAlreadyCalled();

  function bid() external payable {
    if (block.timestamp > auctionEndTime) {
      revert AuctionAlreadyEnded();
    }

    if (msg.value <= highestBid) {
      revert BidNotHighEnough(msg.value);
    }

    if (highestBid != 0) {
      pendingReturns[highestBidder] += highestBid;
    }

    highestBidder = msg.sender;
    highestBid = msg.value;
    emit HighestBidIncreased(msg.sender, msg.value);
  }

  function withdraw() external returns (bool) {
    uint amount = pendingReturns[msg.sender];
    if (amount > 0) {
      pendingReturns[msg.sender] = 0;
      if (!payable(msg.sender).send(amount)) {
        pendingReturns[msg.sender] = amount;
        return false;
      }
    }

    return true;
  }

  function auctionEnd() external {
    if (block.timestamp < auctionEndTime) {
      revert AuctionNotYetEnded();
    }
    if (ended) {
      revert AuctionAlreadyEnded();
    }

    ended = true;
    emit AuctionEnded(highestBidder, highestBid);

    beneficiary.transfer(highestBid);
  }
}
