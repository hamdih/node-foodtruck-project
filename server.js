const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const bodyParser = require('body-parser');
const foodtruckapi = require('./API/foodtruckapi/foodtruckapi.js');

var{mongoose} = require('./server/db/mongoose');
var {foodTruck} = require('./server/models/foodTrucks');
var {User} = require('./server/models/user');
//when importing models

const port = process.env.PORT || 3000;
var app = express();
//middle ware how your express application works, third party on, customization
//__dirname path to root of project
app.use(bodyParser.json());//bodyparse to parse body of json data

//partial helper is a function that can be ran from template

//how to send json to our express application using postman for req and res
 //Create a user
 app.post('/users',(req,res) => {
 	var newUser = new User({
 		firstName: req.body.firstName,
 		lastName: req.body.lastName,
 		foodPreference: req.body.foodPreference,
 		favFoodTrucks: req.body.favFoodTrucks
 	});
 	newUser.save().then((result) =>{
		
		res.status(200).send(result);
 		},(e)=>{
		res.status(400).send(e);
		
 	});
});
//Create a food truck
app.post('/foodTrucks',(req,res) => {
 	var newfoodTruck = new foodTruck({
 		name: req.body.name,
 		location: req.body.location,
 		typeOfFood: req.body.typeOfFood,
 		rank: req.body.rank,

 	});
 	newfoodTruck.save().then((result) =>{
		
		res.status(200).send(result);
 		},(e)=>{
		res.status(400).send(e);
		
 	});
});

/*************************User Functions********/
//get all users

//get all user's favorite food trucks

//add favorite food truck to user = add user to food truck

//delete food truck of user = delete user from food truck

/*************************Food Truck Functions********/
//get all food trucks

//get food trucks based on search bar

//get food trucks based on foodType

//get food trucks based on nearest/location

/*************************Randomize feature Functions********/
//Get random food truck based on users favorites

//get random food truck based on foodType

//get random food truck based on lunch,breakfast,dinner, etc


app.post('/addFoodTrucks/:offset',(req,res) =>{
	var offset = req.params.offset;	
	foodtruckapi.foodtruckapi(offset,(errormessage,results)=>{
			if(errormessage){
					res.status(400).send();
			}else{
				foodTruck.insertMany(results,(error, docs)=> {
					if(error){
						return console.log(error);
					}
					res.status(200).send(docs);
				});
				

			}
	})
})




hbs.registerHelper('getCurrentYear',() => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');                  //configurations for express
hbs.registerPartials(__dirname + '/views/partials'); 

 app.get('/comingsoon',(req,res)=>{
 		res.render('comingsoon.hbs');
 });

app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log + '\n', (err) =>{
		if(err){
			console.log('Unable to append to server.log');
		}
	});
	next();
});       //middleware


app.get('/', (req,res) => {
	//req headers what was requested
	//res - can decide what is sent back, status codes
	// res.send('<h2>Hello Express</h2>');
	res.sendFile('views/signup.html', {root:__dirname});
});


app.get('/about', (req,res) =>{
	res.render('about.hbs', {
		pageTitle: 'About Page',
	}); //render the page
});

app.get('/bad', (req,res)=>{
	res.send({
		Status: "Bad Error"
	})
});
app.get('/projects', (req,res)=>{
	res.render('projects.hbs',{
		pageTitle: 'Projects Page',
		welcome: 'Github Projects'
	})
});

app.listen(port, () =>{

	console.log(`Server is up on port ${port}`);

});											//bind to a port