const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const db = require('./database/databaseConnection');
const create_admin = require('./database/createAdmin');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const UserRegister = require('./routes/userRegistration');
const UserLogin = require('./routes/userLogin');
const User = require('./routes/users');

app.use('/register', UserRegister);
app.use('/users', User);
app.use('/login',UserLogin);

app.listen(port, function(){
	console.log('server start on port '+port)
});