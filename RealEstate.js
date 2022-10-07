const { expect } = require("chai");
const { ethers } = require("hardhat");

/*
npx hardhat test test/RealEstate.js
*/

describe("RealEstate", () => {
	let realEstate, escrow
	let deployer, seller
	let nftID = 1

	beforeEach(async () => {
		// set up accounts
		accounts = await ethers.getSigners()
		deployer = accounts[0]
		seller   = deployer
		buyer    = accounts[1]

		// load ethers contract
		const RealEstate = await ethers.getContractFactory("RealEstate")
		const Escrow     = await ethers.getContractFactory("Escrow")

		// deploy contract on blockchain
		realEstate = await RealEstate.deploy()
		escrow     = await Escrow.deploy(realEstate.address, nftID, seller, buyer)
	})

	describe("Deployment", async () => {
		it("sends nft to seller / deployer", async() => {
			expect(await realEstate.ownerOf(nftID)).to.equal(seller.address)
		})
	})

	describe("Selling Real Estate", async () => {
		// expects seller to be NFT owner before the sale
		it("executes successful transaction", async() => {
			expect(await realEstate.ownerOf(nftID)).to.equal(seller.address)
		})
	})
})
