const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {app} = require('./../../../server');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
	_id: userOneId,
	email: "hamdi@example.com",
	password :'useronepass',
	tokens: [{
		access :'auth',
		token: jwt.sign({_id:userOneId,access: 'auth'}, 'abc123').toString()
	}]
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