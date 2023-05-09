"use strict";

import fetch from "node-fetch";
import { writeFile } from "fs/promises";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Recipes", null, {});
	},
};

async function generateRecipes() {
	const data = fetch("https://dummyjson.com/products/30");
	const products = JSON.parse(data);
}
