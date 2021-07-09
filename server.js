const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mysql_pool = require("./db/mysql_pool");
const { insertJson, getJsonCount, getLatestJson } = require("./db/table_ops");
const app = express();

app.use(express.json());

const port = process.env.PORT || 8080;
app.get("/hello", (req, res) => {
  res.status(200).send("Hi");
});

app.get("/json-count", async (req, res) => {
  const count = await getJsonCount()
  res.status(200).send(`<p>${count} json records</p>`);
});

app.get("/latest-json", async (req, res) => {
  const count = await getJsonCount()
  const lastestJson = await getLatestJson();
  res.status(200).send(`<p>${count} json records</p><p>${lastestJson}</p>`);
});

app.post("/post-json", (req, res) => {
  console.log("post content", req.body);
  const json_string = JSON.stringify(req.body);
  const insertResults = insertJson(json_string);
  res.status(201).send(insertResults);
});

const server = app.listen(port, () => {
  console.log(`Express server listening at port ${port}!`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  server.close(() => {
    console.log("Shutting down server ...");
    mysql_pool.end(() => {
      console.log("\tmysql pool ended!");
    });
  });
});
