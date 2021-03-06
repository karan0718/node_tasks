const express = require('express');
const router = express.Router();
const serviceModel = require('../models/Service');
const connection = require('../database/databaseConnection');


router.get('/', (req,res,next) => {
	connection.query(serviceModel.getServices(), (err, response) => {
		if(err)
			res.status(400).json({message:'Error in db connection.'});
		if(response.length > 0){
			res.status(200).json({message:'Services list',data:response});
		}else{
			res.status(400).json({message:'Services not found.'})
		}
	});
});

router.post('/add', (req,res,next) => {
	// if(req.session.user.type !== 'service_provider'){
	// 	res.status(400).json({message:'You are not authorized to add the services.'});
	// }else{
		const postData = req.body;
		const service = new serviceModel(postData.service_name,1,postData.city,postData.price);
		connection.query(service.addService(), (err, response) => {
			if(err)
				res.status(400).json({message:err});
			if(response.insertId > 0){
				connection.query(serviceModel.getServiceById(response.insertId), (err, response) => {
					if(err)
						res.status(400).json({message:err});
					if(response)
						res.status(200).json({message: 'Service added successfully.',data:response});
				})
			}
		});
	//}

});

router.get('/:serviceId', (req,res,next) => {
	let serviceId = req.params.serviceId;
	let sessionUser = req.session.user;
	if(serviceId != null || serviceId != '' || serviceId != undefined){
		connection.query(serviceModel.getServiceById(serviceId), (err, response) => {
			if(err)
				res.status(400).json({message:'Error in db connection.'});
			if(response.length > 0){
				if(sessionUser.type == 'admin' || sessionUser.id == response[0].user_id){
					res.status(200).json({message:'Service detail',data:response});
				}
			}else{
				res.status(400).json({message:'Service not found with this id.'})
			}
		});
	}
});

router.post('/update', (req,res,next) => {
	postData = req.body;
	sessionUser = req.session.user;
	let serviceId = postData.id;
	connection.query(serviceModel.getServiceById(serviceId), (err, response) => {
		if(err)
			res.status(400).json({message:'Error in db connection.'});
		if(response.length > 0){
			if(sessionUser.type == 'admin' || sessionUser.id == response[0].user_id){
				let serviceName = postData.service_name;
				let city = postData.city;
				let price = postData.price;
				connection.query(serviceModel.updateService(serviceId,serviceName,city,price), (err, response) => {
					if(err)
						res.status(400).json({message:'Error in db connection.'});
					if(response.affectedRows > 0 )
						res.status(200).json({message:'Service update successfully.'});
				});	
			}else{
				res.status(400).json({message:'Unauthorized user to update this service.'});
			}
		}
	});
});

router.delete('/:serviceId', (req,res,next) =>{
	const serviceId = req.params.serviceId;
	connection.query(serviceModel.deleteServiceById(serviceId), (err, response) => {
		if(err)
			res.status(400).json({message:'Error in db connection.'});
		if(response.affectedRows > 0 )
			res.status(200).json({message:'Service deleted successfully.'});
	});
})

function isLoggedIn(req,res,next){
	if (req.session.isLoggedIn)
		return next();
	res.status(400).json({message:'Please login first'});
}

module.exports = router;