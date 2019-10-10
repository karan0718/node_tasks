var express = require('express');
var http = require('http');
var url = require('url');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.set('Port',process.env.port||8000)	
app.set('port', process.env.PORT || 8000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.set(express.json());
app.use(express.static(path.join(__dirname,'public')));

var employee = require('./routes/employee');

var con = mysql.createConnection({host:'localhost',user:'root',password:'ourdesignz',database:'node_exercise'});
// app.use(express.static(path.join(__dirname,js)))
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
	res.render('register');
});

app.post('/register1',function(req,res){
	console.log(req.body);
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;
	var category = req.body.category;
	var radio = req.body.radio;
	var checkbox = req.body.checkbox;
	var description = req.body.description;
	var sql = "insert into employees (name,email,password,category,radio,checkbox,description) values ('"+name+"','"+email+"','"+password+"','"+category+"','"+radio+"','"+checkbox+"','"+description+"')";
	con.query(sql,function(err,result){
		if(err){
			throw err;
		}else{
			if(result){
				res.end('inserted');
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

http.createServer(app).listen(app.get('port'),function(){
	console.log('express.server'+app.get('port'));
});