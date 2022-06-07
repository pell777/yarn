const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const http = require("http");
const cors = require("cors");
const fs = require("fs");
const { initDB } = require("../db");
const ToDo = require("../db/models/todo.models");

const SERVER_PORT = process.env.PORT||3000;
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
  console.log("BODY", req.body);
  console.log("QUERY", req.query);
  console.log("login", req.body);
  console.log("password", req.params);

  next();
});

app.post("/auth", async (req, res) => {
  //РЕГИСТРАЦИЯ
  let user = await ToDo.findOne({ where: { login: req.body.login } });
  if (!user) {
    try {
      const hashPassword = bcrypt.hashSync(req.body.password, 5); //ХЕШИРОВАНИЕ ПАРОЛЯ
      const token1 = jwt.sign(
        //СОЗДАНИЕ ТОКЕНА
        {
          login: req.body.login,
        },
        TOKEN,
      );
      const todo = await ToDo.create({
        login: req.body.login,
        password: hashPassword,
        token: token1,
      });
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(400).json({ message: "Пользователь уже зарегестрирован" });
  }
});

app.get("/auth/all", async (req, res) => {
  //ПОЛУЧИТЬ ВСЕХ

    try {
      res.status(200).json(await ToDo.findAll());
    } catch (error) {
      res.status(500).json(error);
    }
});

app.get("/auth/:token", async (req, res) => {
  //ПОЛУЧИТЬ ПО ЛОГИНУ
  try {
    const user = await ToDo.findOne({
      where: {
        token: `${req.params.token}`,
      },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "Такого пользователя нет" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

app.patch("/auth/:token/:password/:newpassword", async (req, res) => {
  //ИЗМЕНЕНИЕ ПАРОЛЯ
  const token = await ToDo.findOne({ where: { token: req.params.token } });
  if (token) {
    const password = bcrypt.compareSync(req.params.password, token.password);
    if (password) {
      try {
        await ToDo.update(
          {
            password: bcrypt.hashSync(req.params.newpassword, 5),
          },
          {
            where: { token: req.params.token },
          }
        );
        res.status(200).json({ message: "Пароль сменен" });
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(200).json({ message: "Неверный пароль" });
    }
  } else {
    res.status(200).json({ message: "Пользователь не существует" });
  }
});

app.delete("/auth/:login/:password", async (req, res) => {
  // УДАЛЕНИЕ ПОЛЬЗОВАТЕЛЯ
  const user = await ToDo.findOne({ where: { login: req.params.login } });
  const password = bcrypt.compareSync(req.params.password, user.password);
  if (password) {
    try {
      await ToDo.destroy({
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

http.createServer(app).listen(SERVER_PORT, () => {
  console.log(`Server is working on port ${SERVER_PORT}`);
});
