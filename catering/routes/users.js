const express = require('express');
const router = express.Router();
const userModel = require('../models/Users');
const connection = require('../database/databaseConnection');
const bCrypt = require('bcrypt-nodejs');

router.get('/', isLoggedIn,  (req,res,next) => {
	connection.query(userModel.getAllUsers(), (err,result) => {
		if(err)
			res.status(400).json({message:'Error in db connection.'});
		res.status(200).json({
			message:'Users',
			data:result
		})
	});
});

router.get('/logout', isLoggedIn, (req,res,next) => {
	req.session.destroy( (err) => {
		if(err)
			res.status(400).json({message:'Error destroying session.'});
		if(!err)
			res.status(200).json({message:'Logout successfully.'});
	});
});

router.get('/:userId', isLoggedIn, (req,res,next) => {
	userId = req.params.userId;
	sessionUser = req.session.user;
	if(sessionUser.type === 'admin' || sessionUser.id == userId){
		connection.query(userModel.findUserById(userId), (err,response) => {
			if(err)
				res.status(400).json({message:'Error in db connection.'});
			if(response.length > 0)
				res.status(200).json({message:'User details.',data:response});
			else
				res.status(400).json({message:'No user found with this id.'});
		});
	}else{
		res.status(400).json({message:'You are not authorized to view this detail.'});
	}
});

router.post('/update', isLoggedIn, (req,res,next) => {
	let name = req.body.name;
	let password =  bCrypt.hashSync(req.body.password,bCrypt.genSaltSync(8),null);
	let email = req.body.email;
	let id = req.body.id;
	if(req.session.user.id != id){
		res.status(400).json({message:'Unauthorized User'});
	}else{
		connection.query(userModel.findUserByEmailAndId(email,id), (err, result) => {
			if(err)
				res.status(400).json({message:'Error in db connection.'});
			if(result.length > 0)
				res.status(400).json({message:"Email is already used"});
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
