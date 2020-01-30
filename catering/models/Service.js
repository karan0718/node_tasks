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
}

module.exports = Service;