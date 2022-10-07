// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.6.0 <0.9.0;

import "hardhat/console.sol";

struct Funder {
  address addr;
  uint amount;
}

contract CrowdFunding {
  struct Campaign {
    address payable beneficiary;
    uint fundingGoal;
    uint numFunders;
    uint amount;
    mapping (uint => Funder) funders;
  }

  uint numCampaigns;
  mapping (uint => Campaign) campaigns;

  function newCampaign(address payable beneficiary, uint goal) public returns (uint campaignID) {
    campaignID = numCampaigns++;

    Campaign storage c = campaigns[campaignID];
    c.beneficiary = beneficiary;
    c.fundingGoal = goal;

    console.log("newCampaign: ");
    console.log(" beneficiary: ", c.beneficiary);
    console.log(" fundingGoal: ", c.fundingGoal);
  }

  function contribute(uint campaignID) public payable {
    Campaign storage c = campaigns[campaignID];
    c.funders[c.numFunders++] = Funder(msg.sender, msg.value);
    c.amount += msg.value;

    console.log("contribute: ");
    console.log(" amount: ", c.amount);
  }

  function checkGoalReached(uint campaignID) public returns (bool reached) {
    Campaign storage c = campaigns[campaignID];
    if (c.amount < c.fundingGoal) {
      console.log("reached?", reached);
      return false;
    }

    uint amount = c.amount;
    c.amount = 0;
    c.beneficiary.transfer(amount);

    console.log("reached?", reached);
    return true;
  }
}
