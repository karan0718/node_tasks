var db = require('../../config/database');
var users = {
	getUserByEmail: function(email,callback){
		return db.query("SELECT * FROM users where email='"+email+"'",callback);
	},
	createUser: function(parameters,callback){
		return db.query("INSERT INTO users (name,email,password) VALUES ('"+parameters.name+"','"+parameters.email+"','"+parameters.password+"')",callback)
	},
	findById: function(id,callback){
		return db.query("SELECT * FROM users where id='"+id+"'",callback);	
	}
}

module.exports = users