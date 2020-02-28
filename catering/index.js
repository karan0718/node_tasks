const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors')
const db = require('./database/databaseConnection');
const create_admin = require('./database/createAdmin');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');
const multer = require('multer');
require('./config/passport')(passport);


const UserRegister = require('./routes/userRegistration');
const UserLogin = require('./routes/userLogin');
const User = require('./routes/users');
const Service = require('./routes/services');

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ourdesignz',
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
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session());


const storage = multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,'/var/www/html/react/redux/preskriber/public')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
})
const upload = multer({ storage: storage }).single('file')

app.use('/register', UserRegister);
app.use('/users', User);
app.use('/login',UserLogin);
app.use('/service',Service);

app.post('/upload',(req,res,next) => {
    let imageSaved = false;
    upload(req,res,function(err){
        if (err instanceof multer.MulterError) {
           return res.status(500).json(err)
        } else if (err) {
           return res.status(500).json(err)
        }
        console.log(req.file)
        const sql = `INSERT INTO images (image_path) VALUES ('${req.file.filename}')`;
        db.query(sql, (err,result) => {
            if(err)
                return res.status(500).json(err)
            if(result.affectedRows > 0){
                const data = {id:result.insertId,image_path:req.file.filename}
                console.log(data)
                return res.status(200).send(data)
            }
        });
        
    })
});

app.get('/images',(req,res,next) =>{
    const sql = `SELECT id,image_path FROM images`;
    db.query(sql, (err,result) =>{
        if(err)
            return res.status(500).json(err)
        if(result)
            return res.status(200).json(result)
    })
});

app.listen(port, function(){
	console.log('server start on port '+port)
});