var express = require('express');
var routes = express.Router();
var formidable = require('formidable');
var fs = require('fs');

routes.post('/read-json-file',function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req);
	form.on('fileBegin', function(name,file){
		file.path ='public/uploads/'+file.name;
	});
	form.on('file', function(name,file){
		fs.readFile('public/uploads/'+file.name,"utf8",function(error, data){
			console.log(data);
			res.send(data);
		});
		fs.close;
	});

});
module.exports = routes;