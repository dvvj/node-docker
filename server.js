const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mysql_pool = require("./db/mysql_pool");
const app = express();

app.use(express.json());

const port = process.env.PORT || 8080;
app.get("/hello", (req, res) => {
  console.log("mysql_pool: ", mysql_pool);
  res.status(200).send("Hi");
});

app.post("/test-post", (req, res) => {
  console.log("post content", req.body);
  res.status(200).send(req.body);
});

app.listen(port, () => {
  console.log(`Express server listening at port ${port}!`);
});
