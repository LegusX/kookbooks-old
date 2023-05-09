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
			this.belongsToMany(models.Book, { through: "BookRecipes" });
			this.belongsTo(models.User);
			this.hasMany(models.Image);
			this.belongsToMany(models.Ingredient, { through: "RecipeIngredients" });
		}
	}
	Recipe.init(
		{
			id: {
				type: DataTypes.UUIDV4,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			text: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Recipe",
		}
	);
	return Recipe;
};
