// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.4.16 <0.9.0;

// import "hardhat/console.sol";

contract A {
  function f(uint8 val) public pure returns (uint8 out) {
    // console.log(type(uint8).max);
    out = val;
  }

  function f(uint val) public pure returns (uint out) {
    out = val;
  }
}
