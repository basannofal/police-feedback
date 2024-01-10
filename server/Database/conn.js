const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "rajasthan_police",
});

conn.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB CONNECTED !");
  }
});

module.exports = conn;
