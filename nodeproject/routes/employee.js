var mysql = require('mysql')
exports.list = function(req,res){
	var con = mysql.createConnection({host:'localhost',user:'roots',password:'',database:'node_exercise'});
	var query = 'select * from employees';
	con.query(query,function(err,result){
		if(err) throw err;
		if(result.length){
			res.render('employees/list',{data:result});
		}else{
			console.log('no data found.');
		}
	});
}