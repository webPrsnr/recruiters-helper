const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("resume", "user", "password", {
  dialect: "sqlite",
  host: "./dev.sqlite",
});

module.exports = sequelize;
