const connection = require('./databaseConnection');

const getAdmin = 'SELECT * FROM users where type = "admin" LIMIT 1';
const checkAdminIfExist = connection.query(getAdmin, (err,result,fields) => {
	if(err)
		throw err;
	if(result.length == 0){
		let query = "INSERT INTO users (name,email,password,type) VALUES ('admin','admin@admin.com','admin','admin')";
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