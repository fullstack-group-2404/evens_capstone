const pg = require("pg");

// If it crashes locally it's because I only set up deploy configuration
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/fsa_app_db",
  // user: process.env.USERNAME,
  // password: process.env.PASSWORD,
  // database: process.env.DATABASE,
  // port: process.env.PORT,
  // host: process.env.HOST,
  // ssl: process.env.NODE_ENV === "production"
  // ? { rejectUnauthorized: false }
  // : false,


);

module.exports = { client };
