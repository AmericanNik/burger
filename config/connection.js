var mysql = require("mysql");

connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "burger_db"
  });


  connection.connect(function(err) {
    //If there is an error when connecting to the database, log the error to the console.
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    //If a database connection is established, log the database thread number.
    console.log("connected as id " + connection.threadId);
  });

  module.exports = connection;
