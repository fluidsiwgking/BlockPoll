// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./VotingPoll.sol";

contract VotingFactory {
    event PollCreated(address indexed creator, address poll, string questionUri, uint256 deadline);

    address[] public polls;

    function createPoll(string memory questionUri, string[] memory options, uint256 deadline)
        external
+        returns (address)
+    {
+        VotingPoll poll = new VotingPoll(questionUri, options, deadline);
+        polls.push(address(poll));
+        emit PollCreated(msg.sender, address(poll), questionUri, deadline);
+        return address(poll);
+    }
+
+    function allPolls() external view returns (address[] memory) {
+        return polls;
+    }
+}
