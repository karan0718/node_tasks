const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const db = require('./database/databaseConnection');
const create_admin = require('./database/createAdmin');
const bodyParser = require('body-parser');
const UserRegister = require('./routes/userRegistration');
const UserLogin = require('./routes/userLogin');
const User = require('./routes/users');
const passport = require('passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');
require('./config/passport')(passport);

const options = {
    host: 'localhost',
    port: 3306,
    user: 'roots',
    password: '',
    database: 'node_catering'
};

const sessionStore = new MySQLStore(options);

app.use(cookieParser());
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session());

app.use('/register', UserRegister);
app.use('/users', User);
app.use('/login',UserLogin);

app.listen(port, function(){
	console.log('server start on port '+port)
});