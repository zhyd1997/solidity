// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.6.0 <0.9.0;

struct Data {
  mapping (uint => bool) flags;
}

library Set {
  function insert(Data storage self, uint value) public returns (bool) {
    if (self.flags[value]) {
      return false;
    }
    self.flags[value] = true;
    return true;
  }

  function remove(Data storage self, uint value) public returns (bool) {
    if (!self.flags[value]) {
      return false;
    }
    self.flags[value] = false;
    return true;
  }

  function contains(Data storage self, uint value) public view returns (bool) {
    return self.flags[value];
  }
}

using Set for Data;

contract SetLib {
  Data knownValues;

  function register(uint value) public {
    require(knownValues.insert(value));
  }
}
