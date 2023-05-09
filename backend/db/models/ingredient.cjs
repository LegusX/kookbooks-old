"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Ingredient extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Recipe);
		}
	}
	Ingredient.init(
		{
			id: {
				type: DataTypes.UUIDV4,
				defaultValue: DataTypes.UUIDV4,
			},
			name: {
				type: DataTypes.STRING(32),
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Ingredient",
		}
	);
	return Ingredient;
};
