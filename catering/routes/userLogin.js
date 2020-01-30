const express = require('express');
const router = express.Router();
const passport = require('passport');

// router.post('/', (req,res,next) => {
// 	let postData = req.body;
// 	connection.query(userModel.login(postData.email,postData.password), (err,result) => {
// 		if(err)
// 			throw err;
// 		if(result.length > 0){
// 			res.status(200).json({
// 				message:'Authentication successful.',
// 				data:result
// 			})
// 		}
// 	});
// });

router.post('/', (req,res,next) => {
	passport.authenticate('local-signin', (err,user,info) => {
		if(err)
			res.status(400).json({message:'There was an error occured.'});
		if(user)
			res.status(200).json({data:user});
		if(info)
			res.status(400).json({message:info});
	})(req,res,next);
});

module.exports = router;