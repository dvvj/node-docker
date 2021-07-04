const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_DB } = process.env;
if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASS || !DB_DB) {
  throw new Error(
    `Database config not found in environment variables: ${JSON.stringify(
      process.env
    )}`
  );
}

module.exports = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DB_DB,
};
