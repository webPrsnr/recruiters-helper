const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/database");

class Resume extends Model {}

Resume.init(
  {
    api_key: {
      type: DataTypes.STRING,
    },
    resume_id: {
      type: DataTypes.STRING,
    },
    resume_link: {
      type: DataTypes.STRING,
    },
    resume_fields: {
      type: DataTypes.JSON(),
    },
  },
  {
    sequelize,
    modelName: "resume",
  }
);

module.exports = Resume;
