var express = require('express');
var routes = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var randomstring = require("randomstring");
var mongoose = require('mongoose');

routes.get('/register', function(req,res){
	res.render('users/register');
});
routes.post('/register', function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err,fields,files){
		var image_name = files.user_image.name;
		fs.readFile(files.user_image.path, function(err,data){
			if(err) throw err;
			fs.writeFile('public/uploads/user_images/'+image_name,data, function(err){
				if(err) throw err;
				fields.user_image = image_name;
				var url = "mongodb://localhost:27017/restaurants";
				mongoose.connect(url, function(err,db){
					if(err){
						throw err;
					}	
					//console.log(fields);
					db.collection('restaurants').find({}).toArray(function(err,result){
						if(err){
							console.log('eeeee');
						}
						console.log(result);
					})
					//db.collection('users').insert(fields);
					db.close();
				})
				res.send('User Inserted');
			});
		});
	});
})
module.exports = routes;