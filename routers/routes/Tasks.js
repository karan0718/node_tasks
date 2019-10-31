var express = require('express');
var routes = express.Router();

var Tasks = require('../models/tasks');

routes.get('/add', function(req,res,next){
	res.render('task/add');
});
routes.post('/store', function(req,res,next){
	var parameters = req.body;
	Tasks.addTasks(parameters,function(err,result){
		if(err){
			console.log(err)
		} else{
			if(result.affectedRows >= 1){
				res.redirect('/tasks');
			}
		}
	});
});
routes.post('/update', function(req,res,next){
	var parameters = req.body;
	Tasks.updateTask(parameters, function(err,result){
		if(err){
			console.log(err);
		} else{
			if(result.affectedRows >= 1){
				res.redirect('/tasks');
			}
		}
	})

});
routes.get('/delete/:id', function(req,res,next){
	var id = req.params.id;
	Tasks.deleteTaskById(id, function(err,result){
		if(err){
			console.log(err);
		}else{
			if(result.affectedRows >= 1){
				res.redirect('/tasks');
			}
		}
	});
});
routes.get('/:id?', function(req,res,next){
	if(req.params.id){
		Tasks.getTaskById(req.params.id,function(err,result){
			if(err) console.log(err);
			if(result.length > 0){
				console.log(result);
				res.render('task/edit',{task:result});
			}
		})
	}else{
		var kk = [];
		Tasks.getAllTasks(function(err,rows){
			if(err){
				res.json(err);
			}else{
				if(rows.length > 0){
					res.render('task/index',{data:rows});
				}else{
					res.json({message:"No record(s) found."});
				}
			}
		});
	}
});

module.exports = routes;