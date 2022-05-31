const express = require("express");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const http = require("http");
const cors = require("cors");
const fs = require("fs");
const { initDB } = require("./db");
const ToDo = require("./db/models/todo.models");

const SERVER_PORT = 3000;
const TOKEN="1a2b-3c4d-5e6f-7g8h"
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

//GET
//POST
//PATCH
//PUT
//DELETE

app.post("/auth", async (req, res) => {
  //РЕГИСТРАЦИЯ

  let user = await ToDo.findOne({ where: { login: req.body.login } });
  const token1=jwt.sign({password:req.body.password},TOKEN,{expiresIn:"1h"})
  if (user) {
    return res
      .status(400)
      .json({ message: `Пользователь ${req.body.login} уже есть` });
  } else {
    try {
      const hashPassword = bcrypt.hashSync(req.body.password, 5);
      const todo = await ToDo.create({
        login: req.body.login,
        password: hashPassword,
        token:token1,
      });
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ error });
    }
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

app.get("/auth/:login", async (req, res) => {
  //ПОЛУЧИТЬ ПО ЛОГИНУ

  try {
    const login = await ToDo.findAll({
      where: {
        login: `${req.params.login}`,
      },
    });
    res.status(200).json(login);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.patch("/auth/:login/:password/:newpassword", async (req, res) => {
  //ИЗМЕНЕНИЕ ПАРОЛЯ
  const user = await ToDo.findOne({ where: { login: req.params.login } });
  const password = bcrypt.compareSync(req.params.password, user.password);
  if (password) {
    try {
      await ToDo.update(
        {
          password: req.params.newpassword,
        },
        {
          where: { login: req.params.login },
        }
      );
      res.status(200).json({ message: "Пароль сменен" });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(200).json({ message: "Неверный логин или пароль" });
  }
});

app.delete("/auth/:login/:password", async (req, res) => {
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
