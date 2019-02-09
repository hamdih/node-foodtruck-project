const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../../server');
const {User} = require('./../models/user');
const {users,populateUsers} = require('./seed/seed');

beforeEach(populateUsers);


describe('POST /sign_up', () =>{
	it('should create a user', (done)=>{
		var email = 'example@example.com';
		var password = '123mb!';
		var firstName = 'Hamdi';
		var lastName = 'Hmimy';
		var fullName = 'Hamdi Hmimy';

		request(app)
			.post('/sign_up')
			.send({email,password,firstName,lastName,fullName})
			.expect((res)=>{
				expect(res.headers['x-auth']).toExist();
			})
			.end((err)=>{
				if(err){
					return done(err);
				}
				User.find({email}).then((user)=>{
					expect(user).toExist();
					expect(user.password).toNotBe(password);
					done();
				})
			});

	})

	it('should return validation error if request invalid', (done)=>{
			// var email = 'example@example.com';
			// var password = '123mb!';
			var email = "hamdi123@gmail.com";
			request(app)
			.post('/sign_up')
			.send({
				email: 'hamdi123@gmail.com',
				password: '12345',
				firstName :'',
				lastName: ''
			})				
			.expect(400)
			.end((err)=>{
				if(err){
					return done(err);
				}
				User.findOne({email}).then((user) =>{
					expect(user).toNotExist();
					done();
				})
			});
	});

	it('should not create user if email is in user', (done)=>{
		
			request(app)
			.post('/sign_up')
			.send({
				email: 'hamdi@example.com',
				password: '123456'
			})			
			.expect(400)
			.end((err)=>{
				if(err){
					return done(err);
				}
				User.findOne({email: 'hamdi@example.com'}).then((user) =>{
					expect(user).toExist();

					done();
				})
			});
	});

})