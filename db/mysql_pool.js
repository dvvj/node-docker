const mysql = require("mysql");
const config = require("./mysql_config");

const pool = mysql.createPool(config);

module.exports = pool;
