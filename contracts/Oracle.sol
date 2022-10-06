// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.4.22 <0.9.0;

contract Oracle {
  struct Request {
    bytes data;
    function(uint) external callback;
  }

  Request[] private requests;
  event NewRequest(uint);

  function query(bytes memory data, function(uint) external callback) public {
    requests.push(Request(data, callback));
    emit NewRequest(requests.length - 1);
  }

  function reply(uint requestID, uint response) public {
    requests[requestID].callback(response);
  }
}

contract OracleUser {
  Oracle private ORACLE_CONST;
  uint private exchangeRate;

  constructor (address oracleContractAddress) {
    ORACLE_CONST = Oracle(address(oracleContractAddress));
  }

  function buySomething() public {
    ORACLE_CONST.query("USD", this.oracleResponse);
  }

  function oracleResponse(uint response) public {
    require(
      msg.sender == address(ORACLE_CONST),
      "Only oracle can call this."
    );
    exchangeRate = response;
  }
}
