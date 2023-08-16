pragma solidity ^0.8.0;

contract PaymentContract {
    address payable public owner; // the address of the owner of the contract
    address payable[] public recipient;
    uint public fee = 0.1 ether; 

    constructor(){
        owner = payable(msg.sender);
    }

    function sendPayment() public payable {
        require(msg.value > fee, "Sent value should be greater than fee");
        owner.transfer(fee);  // Transfer the fee to the owner
        payable(msg.sender).transfer(msg.value - fee);  // Return the remaining amount to the sender
        recipient.push(payable(msg.sender));
    }

    function getUsers() public view returns (address payable[] memory) {
        return recipient;
    }
}

