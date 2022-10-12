// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.5.0 <0.9.0;

contract Sharer {
  function sendHalf(address payable addr) public payable returns (uint balance) {
    require(msg.value % 2 == 0, "Even value required.");
    uint balanceBeforeTransfer = address(this).balance;
    addr.transfer(msg.value / 2);
    assert(address(this).balance == balanceBeforeTransfer - msg.value / 2);
    return address(this).balance;
  }
}
