const express = require('express');
const router = express.Router();
const connection = require('./../database/databaseConnection');
const userModel = require('./../models/Users');

router.post('/', (req,res,next) => {
	let postData = req.body;
	connection.query(userModel.login(postData.email,postData.password), (err,result) => {
		if(err)
			throw err;
		if(result.length > 0){
			res.status(200).json({
				message:'Authentication successful.',
				data:result
			})
		}
	});
});

module.exports = router;