var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var indexRoutes = require('./app/routes/index');
var fileRoutes = require('./app/routes/file_routes');
var userRoutes = require('./app/routes/user_routes');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname+'/views'));
app.set('view engine','ejs');
app.use('/',indexRoutes);
app.use('/file',fileRoutes);
app.use('/user',userRoutes);
app.use(express.static(path.join(__dirname,'public')));
app.listen(app.get('port'), function() {
	console.log('server running at port '+ app.get('port'));
});