// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.4.22 <0.9.0;

contract ERC20 {
  mapping (address => uint) private _balances;
  mapping (address => mapping (address => uint)) _allowance;

  event Transfer(address indexed from, address indexed to, uint value);
  event Approval(address indexed owner, address indexed spender, uint value);

  function allowance(address owner, address spender) public view returns (uint) {
    return _allowance[owner][spender];
  }

  function transferFrom(address sender, address recipient, uint amount) public returns (bool) {
    require(_allowance[sender][msg.sender] >= amount, "ERC20: Allowance not high enough.");
    _allowance[sender][msg.sender] -= amount;
    _transfer(sender, recipient, amount);
    return true;
  }

  function approve(address spender, uint amount) public returns (bool) {
    require(spender != address(0), "ERC20: Approve to zero address");

    _allowance[msg.sender][spender] = amount;
    emit Approval(msg.sender, spender, amount);

    return true;
  }

  function _transfer(address sender, address recipient, uint amount) internal {
    require(sender != address(0), "ERC20: tranfer from the zero address");
    require(recipient != address(0), "ERC20: transfer to the zero address");
    require(_balances[sender] >= amount, "ERC20: Not enough funds");

    _balances[sender] -= amount;
    _balances[recipient] += amount;
    emit Transfer(sender, recipient, amount);
  }
}
