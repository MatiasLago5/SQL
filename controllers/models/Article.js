const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const Article = sequelize.define("Article", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		field: "user_id",
	},
});

module.exports = Article;