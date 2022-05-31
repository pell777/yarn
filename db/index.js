const { database } = require("pg/lib/defaults");
const { Sequelize } = require("sequelize");

//Создаем инстанс sequelize
const sequelizeInstance = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database: "jsTodo",
  username: "postgres",
  password: "2206",
});

const initDB = async () => {
  try {
    await sequelizeInstance.authenticate(); //Авторизация ORM В БД
    await sequelizeInstance.sync(); //Синхронизация МОДЕЛЕЙ
    console.log("Sequilize was запущен");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = {
  sequelizeInstance,
  initDB,
};
