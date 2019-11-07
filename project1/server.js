var express = require('express');
var app = express();
var port = process.env.PORT || 4000;

var passport = require('passport');
var flash    = require('connect-flash');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var userRoutes = require('./app/routes/user');
var configDB = require('./dbConnection.js');

require('./config/passport')(passport);

app.use(flash());
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine','ejs');

app.use(session({resave: false, saveUninitialized: true, secret: 'secretsession' }));
app.use(passport.initialize());
app.use(passport.session());

require('./app/routes')(app, passport);
app.use('/user',userRoutes);

app.listen(port, function(){
	console.log('server start on port '+port)
});