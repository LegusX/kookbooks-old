import { Sequelize } from "sequelize";
import Models from "./models.js";

const sql = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		host: "localhost",
		dialect: "mariadb",
	}
);

export default Models(sql);
