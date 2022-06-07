const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const http = require("http");
const cors = require("cors");
const fs = require("fs");
const { initDB } = require("../db");
const ToDo = require("../db/models/todo.models");
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
  console.log("BODY", req.body);
  console.log("QUERY", req.query.login);
  console.log("QUERY", req.query.password);
  console.log("login", req.body.login);
  console.log("params", req.params);

  next();
});

app.post("/register", async (req, res) => {
  //РЕГИСТРАЦИЯ
  try {
    const hashPassword = bcrypt.hashSync(req.body.password, 5); //ХЕШИРОВАНИЕ ПАРОЛЯ
    const token1 = jwt.sign(
      //СОЗДАНИЕ ТОКЕНА
      {
        login: req.body.login,
        password: req.body.password,
      },
      TOKEN
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
});

app.get("/auth/all", async (req, res) => {
  //ПОЛУЧИТЬ ВСЕХ

  try {
    res.status(200).json(await ToDo.findAll());
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/oneUser", async (req, res) => {
  //ПОЛУЧИТЬ ПО ЛОГИНУ
  try {
    const user = await ToDo.findOne({
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
    const user = await ToDo.findOne({
      where: { login: `${req.query.login}` },
    });
    const a = jwt.verify(user.token, TOKEN);
    if (a) {
      if (req.query.password === a.password) {
        return res.status(200).json({message:true});
      } else {
        return res.status(200).json({message:false});
      }
    } else {
      return res.status(200).json({message:false});
    }
  } catch (error) {
    return res.status(200).json({message:false});
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
