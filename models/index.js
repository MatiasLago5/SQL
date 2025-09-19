const sequelize = require("../db");
const User = require("../controllers/models/User");
const Article = require("../controllers/models/Article");

User.hasMany(Article, { as: "articles", foreignKey: "userId" });
Article.belongsTo(User, { as: "author", foreignKey: "userId" });

module.exports = {
  sequelize,
  User,
  Article,
};
