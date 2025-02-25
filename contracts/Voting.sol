// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(address => bool) public voters;
    Candidate[] public candidates;

    event Voted(address indexed voter, uint candidateIndex);
    
    constructor(string[] memory candidateNames) {
        uint length = candidateNames.length; // Cache length untuk gas efficiency
        for (uint i = 0; i < length; i++) {
            candidates.push(Candidate(candidateNames[i], 0));
        }
    }

    function vote(uint candidateIndex) public {
        require(!voters[msg.sender], "You have already voted!");
        require(candidateIndex < candidates.length, "Invalid candidate!");

        voters[msg.sender] = true;
        candidates[candidateIndex].voteCount += 1;

        emit Voted(msg.sender, candidateIndex);
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getCandidateVoteCount(uint candidateIndex) public view returns (uint) {
        require(candidateIndex < candidates.length, "Invalid candidate!");
        return candidates[candidateIndex].voteCount;
    }
}