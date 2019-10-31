var db = require('../dbconnection');

var Task = {
	getAllTasks: function(callback){
		return db.query("select * from tasks",callback);
	},
	addTasks: function(parameters,callback){
		return db.query("INSERT INTO tasks (name,owner,time_limit) VALUES ('"+parameters.task_name+"','"+parameters.owner+"','"+parameters.time_limit+"')",callback);
	},
	getTaskById: function(id,callback){
		return db.query("SELECT * FROM tasks WHERE id="+id,callback);
	},
	updateTask: function(parameters,callback){
		return db.query("UPDATE tasks SET name='"+parameters.task_name+"',owner='"+parameters.owner+"',time_limit='"+parameters.time_limit+"' WHERE id="+parameters.id,callback);
	},
	deleteTaskById: function(ids,callback){
		return db.query("DELETE FROM tasks where id IN ("+ids+")",callback);
	}
}


module.exports = Task;