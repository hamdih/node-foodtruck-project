var mongoose = require('mongoose');

var foodTruck = mongoose.model('foodTrucks', { //"foodTrucks" collection in DB from up town being connected to
	name:{
		required: true,
		trim: true,
		type: String,
		minLength: 1
	},
	location:{
		// required: true,
		trim: true,
		type: String,
		minLength: 1
	},
	website:{
		// required: true,
		type:String,
		minLength: 1
	},
	email:{
		// required: true,
		trim: true,
		type: String,
		minLength: 1
	},
	phoneNumber:{
		// required: true,
		trim: true,
		type: String,
		minLength: 1
	},
	typeOfFood:[{
			foodType: {		//Choose from drop down menu, diet should be its own model as lookup
				type: String,
				trim: true,
				default: "All"
			},
			includedFood: [
			//to complete later for more specific dishes/taste
			]
	}],
	rank: {
		type: Number
	},
	onlineOrderLink: {
		type: String
	},
	
	 usersSubscribed: [
	 
	 ]

});

module.exports = {foodTruck};