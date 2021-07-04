const mysql_pool = require("./mysql_pool");

const insertJson = (json_string) => {
  console.log("json_string: ", json_string);
  mysql_pool.getConnection((err, conn) => {
    if (err) throw err;

    conn.query(
      "INSERT INTO `json`(json_string) VALUES (?)",
      [json_string],
      (err, results, fields) => {
        conn.release();
        if (err) throw err;

        return results;
      }
    );
  });
};

module.exports = {
  insertJson,
};
