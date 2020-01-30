const express = require('express');
const router = express.Router();
const userModel = require('../models/Users');
const connection = require('../database/databaseConnection');

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
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.status(400).json({message:'Please login first'});
}
module.exports = router;
