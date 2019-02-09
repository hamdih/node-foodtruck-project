const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {app} = require('./../../../server');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

// var data = {
// 		email: body.email,
// 		password: body.password,
// 		firstName: body.fname,
// 		lastName: body.lname,
// 		fullName : body.fname + ' ' + body.lname
// 	}

const users = [{
	_id: userOneId,
	email: "hamdi@example.com",
	password :'useronepass',
	tokens: [{
		access :'auth',
		token: jwt.sign({_id:userOneId,access: 'auth'},  process.env.JWT_SECRET).toString()
	}],
	firstName: "Hamdi" ,
	lastName: "Hmimy",
	fullName: "Hamdi Hmimy"
	},
	{
	_id: userTwoId,
	email: 'hamdi2@example.com',
	password: 'usertwopass',
	}];


const populateUsers = (done) =>{
	User.remove({}).then(()=>{
		var userOne = new User(users[0]).save();
		var userTwo = new User(users[1]).save();

		return Promise.all([userOne,userTwo])
	}).then(() => done());

};
module.exports = {users,populateUsers};