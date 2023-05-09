"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Image extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Recipe);
			this.belongsTo(models.User);
			this.belongsTo(models.Book);
		}
	}
	Image.init(
		{
			id: {
				type: DataTypes.UUIDV4,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			size: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Image",
		}
	);
	return Image;
};
