const express = require('express');
const router = express.Router();
const userModel = require('../models/Users');
const connection = require('../database/databaseConnection');
router.post('/', (req,res,next) => {
	let request = req.body;
	let user = new userModel(request.name,request.email,request.password,request.type);
	connection.query(user.addUser(), (err,data) => {
		if(err)
			throw err;
		if(data.affectedRows > 0){
			res.status(200).json({
				message:"User Created"
			})
		}
	});
});
module.exports = router;