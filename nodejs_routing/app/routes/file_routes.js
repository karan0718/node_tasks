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
// routes.get('/read-the',function(req,res){
// 	let readable = fs.createReadStream('public/new_txt.txt', {
// 	    encoding: 'utf8',
// 	    fd: null,
// 	});
// 	readable.on('readable', function(data) {
// 	  	let chunk;
// 		let word='';
// 		let count=0;
// 	  	while (chunk = readable.read(1) /* here */) {
// 			if(chunk == ' ' || chunk == null){
// 				if(word != '' && word != undefined)
// 					if(word.trim() == "the"){
// 						count = count+1;
// 					}
// 					word = '';
// 			}else{
// 				word = word+chunk;
// 			}
// 	 	}
// 		console.log(count);
// 	});
// });

routes.get('/read-lines', function(req,res){
	let readable = fs.createReadStream('public/new_txt.txt', {
	    encoding: 'utf8',
	    fd: null,
	});
	readable.on('data', function(data) {
		fileData = data;
		let lines = fileData.split("\n");
		let rowData = '';
		if(lines.length >= 2){
			for(let i=0; i<3; i++)
				rowData += lines[i];
		}else{
			rowData = data;
		}
		res.send(rowData);
	});
});

routes.get('/read-the', function(req,res){
	let readable = fs.createReadStream('public/new_txt.txt', {
	    encoding: 'utf8',
	    fd: null,
	});
	let count=0;
	readable.on('data', function(data) {
		data = data.split(' ');
		for(keyword of data){
			if(keyword == 'the'){
				count++;
			}
		}
		res.send("Total number of 'THE' is : "+count);
	});
});

routes.get('/count-lines', function(req,res){
	let readable = fs.createReadStream('public/new_txt.txt',{
		encoding: 'utf8',
		fd: null,
	});
	let count = 0;
	readable.on('data',function(data){
		data = data.split('\n');
		res.send('Total number of lines is : '+data.length);
	});
});

routes.get('/replace-e', function(req,res){
	let readable = fs.createReadStream('public/new_txt.txt', {
		encoding: 'utf8',
		fd: null
	});
	readable.on('data', function(data){
		data = data.replace(/e/g,'');
		res.send(data);
	});
});

routes.get('/write-file', function(req,res){
	let text = 'test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test';
	fs.writeFile('public/new_txt.txt',text, (err) => {
		if(err) console.log(err);
		res.send('File text changed successfuly.');
	});
});
routes.get('/count-words', function(req,res){
	let readable = fs.createReadStream('public/new_txt.txt',{
		encoding: 'utf8',
		fd: null
	});
	readable.on('data',function(data){
		data = data.replace(/\n/g,' ').split(' ');
		res.send('Total number of words in file is : '+data.length);
	});
});
routes.get('/copy-text', function(req,res){
	fs.readFile('public/new_txt.txt','utf8',(err,data) => {
		data = data;
		fs.writeFile('public/copied_file.txt',data,(err) => {
			if(err) console.log(err);
			res.send('Copied data to new file success.');
		});
	});
})
module.exports = routes;