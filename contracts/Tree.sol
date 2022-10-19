// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.8.2 <0.9.0;

/**
 * @title A simulator of trees
 * @author Larry A. Gardner
 * @notice You can use this contract for only the most basic simulation
 * @dev All function calls are currently implemented without side effects
 * @custom:experimental This is an experimental contract.
 */
contract Tree {
  /**
   * @notice Calculate tree age in years, rounded up, for live trees
   * @dev The Alexandr N. Tetearing algorithm could increase precision
   * @param rings The number of rings from dendrochronological sample
   * @return Age in years, rounded up for partial years
   */
  function age(uint rings) external virtual pure returns (uint) {
    return rings + 1;
  }

  /**
   * @notice Returns the amount of leaves the tree has.
   * @dev Returns only a fixed number.
   */
  function leaves() external virtual pure returns (uint) {
    return 2;
  }
}

contract Plant {
  function leaves() external virtual pure returns (uint) {
    return 3;
  }
}

contract KumquatTree is Tree, Plant {
  function age(uint rings) external override pure returns (uint) {
    return rings + 2;
  }

  /**
   * Return the amount of leaves that this specific kind of tree has
   * @inheritdoc Tree
   */
  function leaves() external override(Tree, Plant) pure returns (uint) {
    return 3;
  }
}
