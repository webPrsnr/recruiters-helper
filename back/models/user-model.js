const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/database");

class User extends Model {}

User.init(
  {
    login: {
      type: DataTypes.STRING,
    },
    api_key: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

module.exports = User;
