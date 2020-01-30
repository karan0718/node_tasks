const connection = require('./databaseConnection');
const bCrypt = require('bcrypt-nodejs');

const getAdmin = 'SELECT * FROM users where type = "admin" LIMIT 1';
const generateHash = function(){
	return bCrypt.hashSync('admin',bCrypt.genSaltSync(8),null);
}

const checkAdminIfExist = connection.query(getAdmin, (err,result,fields) => {
	if(err)
		throw err;
	if(result.length == 0){
		const userPassword = generateHash();
		let query = `INSERT INTO users (name,email,password,type) VALUES ('admin','admin@admin.com','${userPassword}','admin')`;
		makeAdmin = connection.query(query, (err,result) => {
			if(err)
				throw err;
			if(result.affectedRows > 0){
				console.log('admin created')
			}
		})
	}else{
		console.log('admin already created');
	}
});