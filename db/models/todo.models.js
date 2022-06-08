const Sequelize = require("sequelize");
const { sequelizeInstance } = require("..");

const ToDo = sequelizeInstance.define(
  "todo",
  {
    // ToDo.init(

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
  },
  { sequelize: sequelizeInstance, underscored: true, modelName: "todo" }
);

const Course = sequelizeInstance.define(
  "course",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nomer: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    inf: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize: sequelizeInstance, underscored: true, modelName: "course" }
);

const Event = sequelizeInstance.define(
  "event",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    inf: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize: sequelizeInstance, underscored: true, modelName: "event" }
);

ToDo.hasOne(Event, { onDelete: "cascade" });

const Enrolment = sequelizeInstance.define(
  "enrolment",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    grade: {
      // оценка студента по данному курсу
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: sequelizeInstance, underscored: true, modelName: "enrolment" }
);

ToDo.belongsToMany(Course, { through: Enrolment });
Course.belongsToMany(ToDo, { through: Enrolment });

module.exports = ToDo;
