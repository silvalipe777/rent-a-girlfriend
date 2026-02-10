// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CryptoGirlsPayment {
    address public immutable owner;

    event PaymentReceived(
        address indexed payer,
        uint256 amount,
        string companionId,
        string plan
    );

    constructor() {
        owner = msg.sender;
    }

    function pay(string calldata companionId, string calldata plan) external payable {
        require(msg.value > 0, "Payment must be > 0");

        (bool sent, ) = owner.call{value: msg.value}("");
        require(sent, "Transfer failed");

        emit PaymentReceived(msg.sender, msg.value, companionId, plan);
    }

    receive() external payable {
        revert("Use pay() function");
    }
}
