var express = require('express');
var routes = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var randomstring = require("randomstring");
var User = require('../models/user_model');
var session = require('express-session');

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
				var user = new User({
					username   : fields.username,
					password   : fields.password,
					email	   : fields.email,
					user_image : image_name
				});
				user.save(function(err){
					if(err){ 
						throw err;
					}
					res.send('User Inserted');
				});
			});
		});
	});
});
routes.get('/login',function(req,res){
	if(!req.session.username){
		res.render('users/login');
	}else{
		res.redirect('/user/profile');
	}
});
routes.post('/login',function(req,res){
	if(!req.session.username){
		User.findOne({username:req.body.username}, function(err,result){
			if(err) throw err;
			if(result){
				if(result.password === req.body.password){
					req.session.username = result.username;
					res.redirect('/user/profile');
				}else{
					res.render('/user/login');
				}
			}
		});
	}else{
		res.redirect('/user/profile');
	}
});
routes.get('/profile', function(req,res){
	if(req.session.username){
		User.findOne({username:req.session.username}, function(err,result){
			if(err) throw err;
			console.log(result);
			res.render('users/profile',{user:result});
		});
	}else{
		res.redirect('/user/login');
	}
});
module.exports = routes;