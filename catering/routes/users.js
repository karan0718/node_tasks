const express = require('express');
const router = express.Router();
const userModel = require('../models/Users');
const connection = require('../database/databaseConnection');

router.get('/', (req,res,next) => {
	connection.query(userModel.getAllUsers(), (err,result) => {
		if(err)
			throw err;
		res.status(200).json({
			message:'Users',
			data:result
		})
	});
});

module.exports = router;
