// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

struct BigintS {
  uint[] limbs;
}

library BigInt {
  function fromUint(uint x) internal pure returns (BigintS memory r) {
    r.limbs = new uint[](1);
    r.limbs[0] = x;
  }

  function add(BigintS memory a, BigintS memory b) internal pure returns (BigintS memory r) {
    r.limbs = new uint[](max(a.limbs.length, b.limbs.length));
    uint carry = 0;
    for (uint i = 0; i < r.limbs.length; ++i) {
      uint limbA = limb(a, i);
      uint limbB = limb(b, i);
      unchecked {
        r.limbs[i] = limbA + limbB + carry;

        if (
          limbA + limbB < limbA ||
          (limbA + limbB == type(uint).max && carry > 0)
        ) {
          carry = 1;
        } else {
          carry = 0;
        }
      }
    }

    if (carry > 0) {
      uint[] memory newLimbs = new uint[](r.limbs.length + 1);
      uint i;
      for (i = 0; i < r.limbs.length; ++i) {
        newLimbs[i] = r.limbs[i];
      }
      newLimbs[i] = carry;
      r.limbs = newLimbs;
    }
  }

  function limb(BigintS memory a, uint index) internal pure returns (uint) {
    return index < a.limbs.length ? a.limbs[index] : 0;
  }

  function max(uint a, uint b) private pure returns (uint) {
    return a > b ? a : b;
  }
}

contract BigintLib {
  using BigInt for BigintS;

  function f() public pure {
    BigintS memory x = BigInt.fromUint(7);
    BigintS memory y = BigInt.fromUint(type(uint).max);
    BigintS memory z = x.add(y);

    assert(z.limb(1) > 0);
  }
}
