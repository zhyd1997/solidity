// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.6.4 <0.9.0;

contract PublicFn {
  function f() public payable returns (bytes4) {
    assert(this.f.address == address(this));
    return this.f.selector;
  }

  function g() public {
    this.f{ gas: 10, value: 800 }();
  }
}
