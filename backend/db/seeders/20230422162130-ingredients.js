"use strict";

import { readFile } from "fs/promises";
/*
source:
  https://world.openfoodfacts.org/entry-date/2016-08/ingredients

regex:
  E*[0-9]+[a-z]*\,*\**(\r\n|\r|\n)
  [a-z]*:.*$(\r\n|\r|\n)
  .*(v|V)itamin.*(\r\n|\r|\n)
  .{35,}.*(\r\n|\r|\n)
  ^[a-z].*\,\**(\r\n|\r|\n)
*/

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("Ingredients", await getIngredients());
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Ingredients", null, {});
	},
};

async function getIngredients() {
	const file = await readFile("./ingredients.csv");
	const ingredientList = file.split("\n");
	const ingredients = ingredientList.map((ingredient) => {
		return {
			name: ingredient,
		};
	});

	return ingredients;
}
