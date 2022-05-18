const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log("URL=", req.url);
  console.log("Original_URL=", req.originalUrl);
  console.log("METHOD=", req.method);
  console.log("HOST=", req.headers.host);
  console.log("IsSecure=", req.secure);
  console.log("BODY=", req.body);
  console.log("QUERY=", req.query);

  next();
});

app.all("/test", (req, res) => {
  res.status(200).json({ message: "OK" });
});

http.createServer(app).listen(3000, () => {
  console.log("Сервер запущен на порту 3000");
});
