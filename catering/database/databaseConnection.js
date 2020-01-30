const mysql = require('mysql');
const connection = mysql.createConnection({host:'localhost',user:'root',password:'ourdesignz',database:'node_catering'});
module.exports = connection;