var express = require('express');
var routes = express.Router();
var departmentModel = require('../models/departments');

routes.get('/', function(req,res){
	departmentModel.getAllDepartments(function(err,response){
		if(err) throw err;
		if(response.length >= 1){
			res.render('departments/index',{'status':true,'result':response});
		}else{
			res.render('departments/index',{'status':false,'message':'No record found'});
		}
	});
});
routes.get('/add', function(req,res){
	res.render('departments/add',{'department':''});
});
routes.post('/store', function(req,res){
	if(req.body.department_name != null){
		departmentModel.addDepartment(req.body,function(error,rows){
			if(error) throw error;
			if(rows.affectedRows >= 1){
				return res.redirect('/department/add');
			}
		});
	}
});
routes.get('/edit/:id',function(req,res){
	departmentModel.getDepartmentById(req.params.id,function(error,result){
		if(error) throw err;
		if(result.length){
			return res.render('departments/add',{'department':result});
		}
	});
});
routes.post('/update/:id', function(req,res){
	departmentModel.updateDepartment(req.body,req.params.id,function(error,result){
		if(error) throw error;
		if(result.affectedRows){
			if(result.affectedRows){
				res.redirect('/department');
			}
		}
	});
});

module.exports = routes;