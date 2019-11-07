var express = require('express');
var routes = express.Router();

routes.get('/profile', function(req, res){
	res.render('profile.ejs', {
		user: req.user
	});
});

module.exports = routes;