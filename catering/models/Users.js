class Users{
	constructor(name,email,password,type){
		this.userName = name;
		this.userEmail = email;
		this.userPassword = password;
		this.userType = type;
	}

	addUser(){
		let sql = `INSERT INTO users (name,email,password,type) VALUES ('${this.userName}','${this.userEmail}','${this.userPassword}','${this.userType}')`;
		return sql;
	}

	static update(name,password,email,id){
		let sql = `UPDATE users SET name='${name}', email='${email}', password='${password}'  where id=`+id;
		return sql;
	}

	static getAllUsers(){
		let sql = `SELECT * FROM users where type != 'admin'`;
		return sql;
	}

	static login(email=null,password=null){
		let sql = `SELECT * FROM users where email='${email}' and password='${password}' limit 1`;
		return sql;
	}

	static findUserByEmail(email=null){
		let sql = `SELECT * FROM users where email='${email}' limit 1`;
		return sql;
	}

	static findUserByEmailAndId(email=null,id=null){
		let sql = `SELECT * FROM users where email='${email}' and id != ${id} limit 1`;
		return sql;
	}

	static findUserById(id=null){
		let sql = `SELECT * FROM users where id=${id}`;
		return sql;
	}
}
module.exports = Users;