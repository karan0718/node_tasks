var mysql = require('mysql');

var conn = mysql.createConnection({host:'localhost',user:'root',password:'ourdesignz',database:'node_exercise'});

module.exports = conn;