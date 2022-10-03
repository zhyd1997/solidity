// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

// import "hardhat/console.sol";

contract Coin {
  address public minter;
  mapping (address => uint) balances;

  event Sent(address from, address to, uint amount);

  constructor() {
    minter = msg.sender;
    // console.log(msg.sender);
  }

  function mint(address receiver, uint amount) public {
    require(msg.sender == minter);
    balances[receiver] += amount;
  }

  error InsufficientBalance(uint requested, uint avaliable);

  function send(address receiver, uint amount) public {
    if (amount > balances[msg.sender]) {
      revert InsufficientBalance({
        requested: amount,
        avaliable: balances[msg.sender]
      });
    }

    balances[msg.sender] -= amount;
    balances[receiver] += amount;

    emit Sent(msg.sender, receiver, amount);
  }
}
