// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

interface IERC721 {
	function transferFrom(address _from, address _to, uint256 _id) external;
}

contract Escrow{
	address public nftAddress;
	uint256 public nftID;

	constructor(address _nftAddress, uint256 _nftID,
				address payable _buyer, address payable _seller){
		nftAddress = _nftAddress;
		nftID  = _nftID;
		seller = _seller;
		buyer  = _buyer;
	}

	// Transfer ownership
	function finalizeSale() public{
		IERC721(nftAddress).transferFrom("seller", "buyer", nftID)
	}
}
