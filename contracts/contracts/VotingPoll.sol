// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract VotingPoll {
    string public questionUri;
    address public creator;
    uint256 public deadline;
    string[] public options;

    mapping(address => bool) public hasVoted;
    mapping(uint256 => uint256) public optionVotes;

    event Voted(address indexed voter, uint256 optionIndex, uint256 newCount);

    constructor(string memory _questionUri, string[] memory _options, uint256 _deadline) {
        require(_options.length >= 2, "need>=2 options");
        require(_deadline > block.timestamp, "deadline in future");
        creator = msg.sender;
        questionUri = _questionUri;
        deadline = _deadline;
        for (uint256 i = 0; i < _options.length; i++) {
            options.push(_options[i]);
        }
    }

    function getOptions() external view returns (string[] memory) {
        return options;
    }

    function vote(uint256 optionIndex) external {
        require(block.timestamp < deadline, "ended");
        require(!hasVoted[msg.sender], "already");
        require(optionIndex < options.length, "bad index");
        hasVoted[msg.sender] = true;
        optionVotes[optionIndex] += 1;
        emit Voted(msg.sender, optionIndex, optionVotes[optionIndex]);
    }

    function getCounts() external view returns (uint256[] memory counts) {
        counts = new uint256[](options.length);
        for (uint256 i = 0; i < options.length; i++) {
            counts[i] = optionVotes[i];
        }
    }
}
