const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const http = require("http");
const cors = require("cors");
const fs = require("fs");
const { initDB } = require("../db");
const Course = require("../db/models/course.models");
const Enrolment = require("../db/models/enrolment.models");
const Event = require("../db/models/event.models");
const User = require("../db/models/user.models");
const { user } = require("pg/lib/defaults");

const SERVER_PORT = process.env.PORT || 3000;
const TOKEN = "1a2b-3c4d-5e6f-7g8h";
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
initDB();

app.use((req, res, next) => {
  console.log("URL = ", req.url);
  console.log("Original_URL = ", req.originalUrl);
  console.log("METHOD = ", req.method);
  console.log("HOST = ", req.headers.host);
  console.log("IsSecure = ", req.secure);
  console.log("QUERY login", req.query.login);
  console.log("QUERY password", req.query.password);
  console.log("BODY login", req.body.login);
  console.log("BODY password", req.body.password);
  next();
});

app.post("/register", async (req, res) => {
  //РЕГИСТРАЦИЯ
  try {
    const hashPassword = bcrypt.hashSync(req.body.password, 5); //ХЕШИРОВАНИЕ ПАРОЛЯ

    const user = await User.create({
      login: req.body.login,
      password: hashPassword,
    });
    const token1 = jwt.sign(
      //СОЗДАНИЕ ТОКЕНА
      {
        id: user.dataValues.id,
      },
      TOKEN
    );
    const otvet = {
      id2: user.dataValues.id,
      token: token1,
    };
    res.status(200).json(otvet);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/auth/all", async (req, res) => {
  //ПОЛУЧИТЬ ВСЕХ

  try {
    res.status(200).json(await User.findAll());
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/oneUser", async (req, res) => {
  //ПОЛУЧИТЬ ПО ЛОГИНУ
  try {
    const user = await User.findOne({
      where: {
        login: `${req.query.login}`,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/authorization", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { login: `${req.query.login}` },
    });
    if (user) {
      const password = bcrypt.compareSync(req.query.password, user.password);
      if (password) {
        return res.status(200).json(user.id);
      } else {
        return res.status(200).json("Пароль");
      }
    } else {
      return res.status(200).json("Логин");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.delete("/auth/:login/:password", async (req, res) => {
  // УДАЛЕНИЕ ПОЛЬЗОВАТЕЛЯ
  const user = await User.findOne({ where: { login: req.params.login } });
  const password = bcrypt.compareSync(req.params.password, user.password);
  if (password) {
    try {
      await User.destroy({
        where: {
          login: `${req.params.login}`,
        },
      });
      res.status(200).json({ message: "Пользователь удален" });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(200).json({ message: "Неверный логин или пароль" });
  }
});

app.get("/delete", async (req, res) => {
  //Удалить ВСЕХ

  try {
    await User.destroy({
      where: {
        
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

http.createServer(app).listen(SERVER_PORT, () => {
  console.log(`Server is working on port ${SERVER_PORT}`);
});
