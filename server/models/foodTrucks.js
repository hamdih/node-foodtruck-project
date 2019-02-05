var mongoose = require('mongoose');

var foodTruck = mongoose.model('foodTrucks', { //"foodTrucks" collection in DB from up town being connected to
	name:{
		// required: true,
		trim: true,
		type: String,
		minLength: 1
	},
	price:{},
	location:[{
		address1:{
			type:String
			// required: true
		},
		address2:{
			type:String
			// required: false
		},
		address3:{
			type:String
			// required: false
		},
		city:{
			type:String
			// required: true
		},
		zip_code:{
			type:String
			// required: true
		},
		country:{
			type:String
			// required: true
		},
		state:{
			type:String
			// required: true
		},
		display_address:{
			type:String
			// required: true
		}

	}],
	coordinates:{
		latitude:{
			type: Number
			// required: true
		},
		longitude:{
			type:Number
			// required: true
		}
	},
	website:{
		// required: true,
		type:String
		// minLength: 1
	},
	email:{
		// required: true,
		trim: true,
		type: String,
		// minLength: 1
	},
	phone:{
		// required: true,
		trim: true,
		type: String
		// minLength: 1
	},
	distance: {
		type: Number
		// required: true
	},
	image_url: String,
	is_closed:{
		type: Boolean
	},
	categories:[{
			title: {		//Choose from drop down menu, diet should be its own model as lookup
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