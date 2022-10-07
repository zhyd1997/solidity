// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.6.0 <0.9.0;

import "hardhat/console.sol";

contract ArrayContract {
  uint[2*20] aLotOfIntegers;
  bool[2][] pairsOfFlags;

  function setAllFlagPairs(bool[2][] memory newPairs) public {
    pairsOfFlags = newPairs;
  }

  struct StructType {
    uint[] contents;
    uint moreInfo;
  }
  StructType s;

  function f(uint[] memory c) public {
    StructType storage g = s;
    g.moreInfo = 2;
    g.contents = c;
  }

  function setFlagPair(uint index, bool flagA, bool flagB) public {
    pairsOfFlags[index][0] = flagA;
    pairsOfFlags[index][1] = flagB;
  }

  function changeFlagArraySize(uint newSize) public {
    if (newSize < pairsOfFlags.length) {
      while (pairsOfFlags.length > newSize) {
        pairsOfFlags.pop();
      }
    } else if (newSize > pairsOfFlags.length) {
      while (pairsOfFlags.length < newSize) {
        pairsOfFlags.push();
      }
    }
  }

  function clear() public {
    delete pairsOfFlags;
    delete aLotOfIntegers;

    pairsOfFlags = new bool[2][](0);
  }

  bytes bytesData;

  function byteArrays(bytes memory data) public {
    bytesData = data;
    for (uint i = 0; i < 7; i++) {
      bytesData.push();
    }
    bytesData[3] = 0x08;
    delete bytesData[2];
  }

  function addFlag(bool[2] memory flag) public returns (uint) {
    pairsOfFlags.push(flag);
    console.log(pairsOfFlags.length);
    return pairsOfFlags.length;
  }

  function createMemoryArray(uint size) public pure returns (bytes memory) {
    uint[2][] memory arrayOfPairs = new uint[2][](size);

    arrayOfPairs[0] = [uint(1), 2];

    bytes memory b = new bytes(200);
    for (uint i = 0; i < b.length; i++) {
      b[i] = bytes1(uint8(i));
    }
    return b;
  }
}
