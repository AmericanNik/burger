var connection = require("./connection.js");

function createQmarks(num){
  var arr = [];
  for(i=0; i<num;i++){
    arr.push("?");
  }
  return arr.toString();
}

function translateSql(ob){
  let arr= [];
  for (var key in ob){
    let value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)){
      if( typeof value === "string" && value.indexOf(" ") >= 0){
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

var orm = {

  selectAll: function(table, cb){

      var dbQuery = "SELECT * FROM burgers";

      connection.query(dbQuery, function(err, res) {
        if (err) {
          throw err;
        }
          cb(res);
      });
    },
  insertOne: function(table, cols, vals, cb) {
    var dbQuery =
    "INSERT INTO " +
    table +
    " (" +
    cols.toString() +
    ") " +
    "VALUES (" +
    createQmarks(vals.length) +
    ") ";

    console.log(dbQuery);
    connection.query(dbQuery, vals, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },

  updateOne: function(table, objColVals, condition, cb) {
    let dbQuery = "UPDATE " + table + " SET " + translateSql(objColVals) + " WHERE " + condition;

    console.log(dbQuery);
    connection.query(dbQuery, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },

  deleteOne: function (table, condition, cb){
    let dbQuery = "DELETE FROM " + table + " WHERE " + condition;
    console.log(dbQuery);
    connection.query(dbQuery, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  }

};

module.exports = orm;