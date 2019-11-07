var mysql = require('mysql');
var conn = mysql.createConnection({host:'localhost',user:'root',password:'ourdesignz',database:'video_player'});
module.exports = conn;