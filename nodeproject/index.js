const express = require('express');
const http = require('http');
var url = require('url');
const path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
const app = express();

const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
	destination: (req,file,callback) => {
		callback(null,"./public/uploads");
	},
	filename: (req,file,cb) => {
		cb(null,(file.filename = file.originalname));
	}
});

const upload = multer({storage:storage});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.set('Port',process.env.port||8000)	
app.set('port', process.env.PORT || 4300);
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.set(express.json());

var employee = require('./routes/employee');

var con = mysql.createConnection({host:'localhost',user:'root',password:'ourdesignz',database:'node_exercise'});
app.use(express.static(path.join(__dirname,'public')));
//app.use(express.static(path.join(__dirname,js)))
app.get('/',function(req,res){
	res.render('index');
});
app.get('/elements',function(req,res){
	res.render('elements');
});

app.get('/generic',function(req,res){
	res.render('generic');
});


app.get('/register',function(req,res){
	var country = 'select `id`,`name` from countries';
	con.query(country,function(err,result){
		if(err) throw err;
		countries = result;
		res.render('register',{country:countries});
	});
});

app.post('/register1',upload.single('file'), (req,res,next) => {
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;
	var category = req.body.category;
	var radio = req.body.radio;
	var checkbox = req.body.checkbox;
	var description = req.body.description;
	var fileName = req.file.filename;
	var sql = "insert into employees (name,email,password,category,radio,checkbox,description,image) values ('"+name+"','"+email+"','"+password+"','"+category+"','"+radio+"','"+checkbox+"','"+description+"','"+fileName+"')";
	con.query(sql,function(err,result){
		if(err){
			throw err;
		}else{
			if(result){
				res.redirect('/employees/list');
			}else{
				res.end('not inserted');
			}
		}
	});

});

app.get('/login',function(req,res){
	res.render('login');
});

app.get('/login1',function(req,res){
	var query =  url.parse(req.url,true).query;
	var queryString = "select * from employees where email='"+query.email+"' AND password='"+query.password+"'";
	con.query(queryString,function(err,result){
		if(err) throw err;
		if(result.length){
			res.end("Login successful.")
		}else{
			res.end("No user found matching this.");
		}
	});
});

app.get('/employees/list',employee.list);

app.get('/employee/edit/:id',function(req,res){
	var sql = "select * from employees where id="+req.params.id;
	con.query(sql,function(err,result){
		if(err) throw err;
		if(result.length >= 1){
			res.render('employees/edit',{data:result});
		}else{
			res.send('No user found');
		}
	})
});

app.get('/employee/delete/:id',function(req,res){
	var sql = "delete from employees where id ="+req.params.id;
	con.query(sql,function(err,result){
		if(err) throw err;
		console.log(result);
		if(result.affectedRows >=1){
			res.redirect('/employees/list');
		}else{
			res.send('Error while deleting record');
		}
	})
});

app.get('/employee/search',function(req,res){
	res.render('employees/search');
});
app.post('/search/employee',function(req,res){
	var sql = "select * from employees where `name` like '"+req.body.key+"%'";
	con.query(sql,function(err,result){
		if(err) throw err;
		res.send(result)
	})
});

app.get('/get/states/:countryId',function(req,res){
	var countryId = req.params.countryId;
	var sql = 'select * from states where country_id = '+countryId;
	con.query(sql,function(err,result){
		if(err) throw err;
		res.send(result);
	});
});

app.get('/get/cities/:stateId',function(req,res){
	var stateId = req.params.stateId;
	var sql = 'select * from cities where state_id = '+stateId;
	con.query(sql,function(err,result){
		if(err) throw err;
		res.send(result);
	});
});



http.createServer(app).listen(app.get('port'),function(){
	console.log('express.server'+app.get('port'));
});