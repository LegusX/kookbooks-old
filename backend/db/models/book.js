"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Book extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.User);
			this.belongsToMany(models.Recipe);
			this.hasOne(models.Image);
		}
	}
	Book.init(
		{
			id: DataTypes.UUIDV4,
			name: DataTypes.STRING,
			description: DataTypes.TEXT,
		},
		{
			sequelize,
			modelName: "Book",
		}
	);
	return Book;
};
