// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.7.1 <0.9.0;

contract owned {
  constructor() {
    owner = payable(msg.sender);
  }

  address payable owner;

  modifier onlyOwner {
    require(msg.sender == owner, "Only owner can call this funciton.");
    _;
  }
}

contract destructible is owned {
  function destroy() public onlyOwner {
    selfdestruct(owner);
  }
}

contract priced {
  modifier costs(uint price) {
    if (msg.value >= price) {
      _;
    }
  }
}

contract Register is priced, destructible {
  mapping (address => bool) registeredAddresses;
  uint price;

  constructor(uint initialPrice) {
    price = initialPrice;
  }

  function register() public payable costs(price) {
    registeredAddresses[msg.sender] = true;
  }

  function changePrice(uint price_) public onlyOwner {
    price = price_;
  }
}

contract MuteX {
  bool locked;
  modifier noReentrancy {
    require(!locked, "Reentrancy call.");
    locked = true;
    _;
    locked = false;
  }

  function f() public noReentrancy returns (uint) {
    (bool success,) = msg.sender.call("");
    require(success);
    return 7;
  }
}
