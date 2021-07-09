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

const getLatestJson = async () => {
  const result = await new Promise((resolve, reject) => {
    mysql_pool.getConnection((err, conn) => {
      if (err) throw err;
  
      conn.query(
        "SELECT json_string FROM `json` ORDER BY id DESC LIMIT 1",
        (err, results, fields) => {
          conn.release();
          if (err) throw err;
  
          if (results.length > 0) {
            const count = results[0].json_string;
            console.log('json_string: ', count)
            resolve(count);
          } else {
            resolve("empty json table")
          }
        }
      );
    });
  })

  return result;
};


const getJsonCount = async () => {
  const result = await new Promise((resolve, reject) => {
    mysql_pool.getConnection((err, conn) => {
      if (err) throw err;
  
      conn.query(
        "SELECT COUNT(*) as count FROM `json`",
        (err, results, fields) => {
          conn.release();
          if (err) throw err;
  
          const count = results[0].count;
          console.log('select count: ', count)
          resolve(count);
        }
      );
    });
  })

  return result;
}

module.exports = {
  insertJson,
  getJsonCount,
  getLatestJson
};
