const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt =require('bcryptjs');
var UserSchema = new mongoose.Schema ({
	firstName:{
		//required: true,
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
		required: true,
		trim: true,
		type: String,
		minLength: 1,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password:{
		//required: true,
		trim: true,
		type: String,
		minlength: 6
	},
	tokens:[{
		access:{
			type: String,
			required: true
		},
		token:{
			type: String,
			required: true
		}
	}],
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
			//required: true
		},
		longitude:{
			type:Number,
			//required: true
		}
	},
	distance: {
		type: Number,
		//required: true
	}
})

UserSchema.methods.toJson = function(){
	var user = this;
	var UserObject = user.toObject();

	return_.pick(userObject,['_id','email']);
}

UserSchema.methods.generateAuthToken = function(){
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

	user.tokens = user.tokens.concat({access, token});
	return user.save().then(() =>{
		return token;
	});
}

UserSchema.statics.findByToken= function(token) {
	var User = this;
	var decoded;

	try{
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	}catch(e){
		return Promise.reject();
	}
}

UserSchema.pre('save',function (next) {
	var user = this;
	//will always run and re has , need to check
	
	if(!user.isModified('password')){
		next();
	}
	bcrypt.genSalt(10,(err,salt)=>{
		bcrypt.hash(user.password,salt, (err,res) =>{
			if (err){
				//dont save
			}
			user.password = res;
			next();
		});
	 
	});
});

UserSchema.statics.findByCredentials = function(email,password){
	var user = this;
	
	return user.findOne({email}).then((user)=>{
		if(!user){
			return Promise.reject();				//promises are callbacks ig rejected will go catch(e)
		}
		return new Promise((resolve, reject)=>{	//can create own promise with resolve and reject
			bcrypt.compare(password,user.password, (err,res)=>{
					if(err){
					reject();
					}else if(!res){
					reject();
					}
					resolve(user);

			});
		});
	});

};

var User = mongoose.model('User', UserSchema);

module.exports = {User};