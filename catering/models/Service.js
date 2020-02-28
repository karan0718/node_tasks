class Service{
	constructor(service_name,user_id,city,price){
		this.service_name = service_name;
		this.user_id = user_id;
		this.city = city;
		this.price = price;
	}

	addService(){
		return `INSERT INTO services (service_name,user_id,city,price) VALUES ('${this.service_name}','${this.user_id}','${this.city}','${this.price}')`;
	}

	static getServiceById(id=null){
		let sql = `SELECT * FROM services where id=${id}`;
		return sql;
	}

	static updateService(serviceId, serviceName, serviceCity, servicePrice){
		let sql = `UPDATE services SET service_name='${serviceName}', city='${servicePrice}', price='${servicePrice}' where id=${serviceId}`;
		return sql;
	}

	static getServices(){
		let sql = `SELECT * FROM services`;
		return sql;
	}

	static deleteServiceById(id=null){
		let sql = `DELETE from services where id=${id}`
		return sql;
	}
}

module.exports = Service;