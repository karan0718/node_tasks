const mysql = require('mysql');
const connection = mysql.createConnection({host:'localhost',user:'roots',password:'',database:'node_catering'});
module.exports = connection;