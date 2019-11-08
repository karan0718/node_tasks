var db = require('../../config/database');
var departments = {
	addDepartment: function(parameters,callback){
		return db.query("INSERT INTO departments (name) VALUES ('"+parameters.department_name+"')", callback );
	},
	getAllDepartments: function(callback){
		return db.query("SELECT * FROM departments",callback);
	},
	getDepartmentById: function(id,callback){
		return db.query("SELECT * FROM departments WHERE id="+id,callback);
	},
	updateDepartment: function(parameters,id,callback){
		return db.query("UPDATE departments SET name='"+parameters.department_name+"' WHERE id="+id, callback);
	}
}

module.exports = departments;