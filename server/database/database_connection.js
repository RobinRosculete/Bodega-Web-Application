const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  multipleStatements: true /* turn on multiple statements */,
});

connection.connect(function (err) {
  if (err) {
    console.error("Database connection  failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

module.exports = connection;
//connection.end();
