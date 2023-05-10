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
			this.belongsToMany(models.User, { through: "UserSubscribedBooks" });
			this.belongsToMany(models.Recipe, { through: "BookRecipes" });
			this.hasOne(models.Image);
		}
	}
	Book.init(
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
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Book",
		}
	);
	return Book;
};
