"use strict";
import fetch from "node-fetch";
import { hash } from "bcrypt";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert("Users", await generateUsers());
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete("Users", null, {});
	},
};

async function generateUsers() {
	const data = await fetch(
		"https://randomuser.me/api/?results=10&nat=us&exc=phone,cell,picture,nat,dob,location"
	);
	let users = JSON.parse(data).results;
	users = users.map(async (user) => {
		const password = await hash(password);
		return {
			name: `${user.name.first} ${user.name.last}`,
			username: user.login.username,
			password,
			email: user.email,
			createdAt: new Date(user.registered.date).getTime(),
			updatedAt: new Date(user.registered.date).getTime(),
		};
	});
	return users;
}
