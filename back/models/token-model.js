const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/database");

class Token extends Model {}

Token.init(
  {
    api_key: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "token",
  }
);

module.exports = Token;
