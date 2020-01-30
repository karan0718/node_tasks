const express = require('express');
const router = express.Router();
//const serviceModel = require('../models/Service');
//const connection = require('../database/databaseConnection');

router.post('/add', isLoggedIn, (req,res,next) => {
	console.log(req);
});

function isLoggedIn(req,res,next){
	console.log(req.session)
	if (req.session.isLoggedIn)
		return next();
	res.status(400).json({message:'Please login first'});
}

module.exports = router;