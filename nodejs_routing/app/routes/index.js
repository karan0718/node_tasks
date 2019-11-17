var express = require('express');
var routes = express.Router();

routes.get('/', function(req,res,next){
	res.send('Hello this is the first route of node js');
});

module.exports = routes;