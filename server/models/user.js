var mongoose = require('mongoose');

var User = mongoose.model('users', { //"users" collection in DB from up town being connected to
	firstName:{
		required: true,
		trim: true,
		type: String,
		minLength: 1
	},
	lastName:{
		//required: true,
		trim: true,
		type: String,
		minLength: 1
	},
	fullName:{
		//required: true,
		type:String,
		minLength: 1
	},
	email:{
		//required: true,
		trim: true,
		type: String,
		minLength: 1
	},
	password:{
		//required: true,
		trim: true,
		type: String,
		minLength: 1
	},
	foodPreference: [{
			foodType: {		//Choose from drop down menu, diet should be its own model as lookup
				type: String,
				trim: true,
				default: "All"
			},
			includedFood: [
			//to complete later for more specific dishes/taste
			]


			//need to fill, will be an array, connected to food trucks foodCategories
		}],

	favFoodTrucks: [//{
			//type: Object
		// foodTruckName:{	
		// 	type: String,
		// 	required: true
		// }
		// foodType: {	//should have a foreign key to connect to foodTruck model
		// 	type: String,
		// 	trim: true,
		// 	required: true
		// }
		//will be an array of food trucks

	//}
	],
	userFriends: [{
		type: String
	}],
	coordinates:{
		latitude:{
			type: Number,
			required: true
		},
		longitude:{
			type:Number,
			required: true
		}
	},
	distance: {
		type: Number,
		required: true
	}

});

module.exports = {User};