// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {MonadGenerator} from "./MonadGenerator.sol";
import {Test} from "forge-std/Test.sol";

contract MonadGeneratorTest is Test {
  MonadGenerator monadGenerator;

  function setUp() public {
    monadGenerator = new MonadGenerator();
  }

  function test_SafeMint() public {
    // balance should be 0 at the beginning
    require(monadGenerator.totalSupply() == 0, "Total supply should be 0");
    
    monadGenerator.safeMint(msg.sender, "#ffffff", "#000000");

    // balance should be 1 after minting
    require(monadGenerator.totalSupply() == 1, "Total supply should be 1");

    // contract should own the token with id 0
    require(monadGenerator.ownerOf(0) == msg.sender, "Contract should own the token with id 0");

    // check tokenURI is not empty
    string memory uri = monadGenerator.tokenURI(0);
    require(bytes(uri).length > 0, "Token URI should not be empty");
  }
}
