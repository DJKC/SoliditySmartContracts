const { expect } = require("chai");
const { ethers } = require("hardhat");

/*
mkdir hardhat_project
npm init
npm install --save-dev hardhat
[select "Create a JavaScript project"]
npx hardhat test
npm install
*/

describe("Counter", () => {
	let counter

	beforeEach(async () => {
		// ethers contract
		const Counter = await ethers.getContractFactory("Counter")

		// contract deployed on blockchain
		counter = await Counter.deploy("My Counter", 1)
	})

	describe("Deployment", () => {
		it("sets the initial count", async() => {
			// read from blockchain
			expect(await counter.count()).to.equal(1)
		})

		it("stores the initial name", async() => {
			// read from blockchain
			expect(await counter.name()).to.equal("My Counter")
		})
	})

	describe("Counting", () => {
		let transaction

		it("reads count from public variable 'count' on blockchain", async() => {
			expect(await counter.count()).to.equal(1)
		})

		it("reads count from getCount() on blockchain", async() => {
			expect(await counter.getCount()).to.equal(1)
		})

		it("increments the count", async() => {
			transaction = await counter.increment()
			await transaction.wait()

			expect(await counter.count()).to.equal(2)

			transaction = await counter.increment()
			await transaction.wait()

			expect(await counter.count()).to.equal(3)
		})

		it("decrements the count", async() => {
			transaction = await counter.decrement()
			await transaction.wait()

			expect(await counter.count()).to.equal(0)

			// can't go below zero
			await expect(counter.decrement()).to.be.reverted
		})

		it("reads name from public variable 'name' on blockchain", async() => {
			expect(await counter.name()).to.equal("My Counter")
		})

		it("reads name from getName() on blockchain", async() => {
			expect(await counter.getName()).to.equal("My Counter")
		})

		it("updates the name", async() => {
			transaction = await counter.setName("New Name")
			await transaction.wait()
			expect(await counter.name()).to.equal("New Name")
		})
	})
})
