const Sequelize = require("sequelize");
const { sequelizeInstance } = require("..");

class ToDo extends Sequelize.Model {}

ToDo.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      //  autoIncrement:true
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    login: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    password: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    token: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
  },
  { sequelize: sequelizeInstance, underscored: true, modelName: "todo" }
);

module.exports = ToDo;
