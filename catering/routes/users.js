const express = require('express');
const router = express.Router();
const userModel = require('../models/Users');
const connection = require('../database/databaseConnection');
const bCrypt = require('bcrypt-nodejs');

router.get('/', isLoggedIn,  (req,res,next) => {
	connection.query(userModel.getAllUsers(), (err,result) => {
		if(err)
			throw err;
		res.status(200).json({
			message:'Users',
			data:result
		})
	});
});

router.post('/update', isLoggedIn, (req,res,next) => {
	let name = req.body.name;
	let password =  bCrypt.hashSync(req.body.password,bCrypt.genSaltSync(8),null);
	let email = req.body.email;
	let id = req.body.id;
	if(req.session.user.id !== id){
		res.status(400).json({message:'Unauthorized User'});
	}else{
		connection.query(userModel.findUserByEmailAndId(email,id), (err, result) => {
			console.log(err);
			if(err)
				res.status(400).json({message:'Error in db connection.'});
			if(result.length > 0)
				res.status(400).json({message:"Email is already used"});
			console.log(userModel.update(name,password,email,id));
			connection.query(userModel.update(name,password,email,id), (err,result) => {
				if(err)
					res.status(400).json({message:'Error in db connection.'});
				console.log(result);
				if(result.affectedRows > 0)
					res.status(200).json({message:'User updated.'});
				else
					res.status(400).json({message:'Error while updating user.'});
			});	
		});
	}
});

function isLoggedIn(req, res, next) {
	if (req.session.isLoggedIn)
		return next();
	res.status(400).json({message:'Please login first'});
}
module.exports = router;
