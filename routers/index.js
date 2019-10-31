var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cors = require('cors');

var routes = require('./routes/index');
var Tasks = require('./routes/Tasks');

var app = express();
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.use('/',routes);
app.use('/tasks',Tasks);
app.use(function (req,res,next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.listen(3000, function(){
	console.log('app start');
});