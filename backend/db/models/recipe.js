"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Recipe extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsToMany(models.Book);
			this.belongsTo(models.User);
			this.hasMany(models.Image);
			this.hasMany(models.Ingredient);
		}
	}
	Recipe.init(
		{
			id: DataTypes.UUIDV4,
			name: DataTypes.STRING,
			text: DataTypes.TEXT,
		},
		{
			sequelize,
			modelName: "Recipe",
		}
	);
	return Recipe;
};
