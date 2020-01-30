const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/', (req, res, next) => {
	passport.authenticate('local-signup', (err,user, info) => {
		if(err)
			res.status(400).json({'message':'There was an error occured.'});
		if(user)
			res.status(200).json({message:'User created',data:user});
		if(info)
			res.status(400).json({message:info});
	})(req, res, next);
});
module.exports = router;