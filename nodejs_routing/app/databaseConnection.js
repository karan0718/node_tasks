var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/restaurants";
mongoose.connect(url, function(err,db){
	if(err) throw err;
	console.log('connection created!');
});
module.exports = mongoose;