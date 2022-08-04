const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/database");

class Field extends Model {}

Field.init(
  {
    resume_id: {
      type: DataTypes.STRING,
    },
    tag: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "field",
    timestamps: false,
  }
);

module.exports = Field;
