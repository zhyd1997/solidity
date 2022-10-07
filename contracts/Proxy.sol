// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.8.5 <0.9.0;

import "hardhat/console.sol";

contract Proxy {
  /// @dev Address of the client contract managed by proxy i.e., this contract
  address client;

  constructor(address client_) {
    client = client_;
  }

  /**
   * Forward call to "setOwner(address)" that is implemented by client
   * after doing basic validation on the address argument.
   */
  function forward(bytes calldata payload) external {
    bytes4 sig = bytes4(payload[:4]);
    if (sig == bytes4(keccak256("setOwner(address)"))) {
      address owner = abi.decode(payload[:4], (address));
      console.log(owner);
      require(owner != address(0), "Address of owner cannot be zero.");
    }
    (bool status, ) = client.delegatecall(payload);
    require(status, "Forwarded call failed.");
  }
}
