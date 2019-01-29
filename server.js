const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
//middle ware how your express application works, third party on, customization
//__dirname path to root of project


//partial helper is a function that can be ran from template

hbs.registerHelper('getCurrentYear',() => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});


app.set('view engine', 'hbs');                  //configurations for express
hbs.registerPartials(__dirname + '/views/partials'); 

// app.use((req,res,next)=>{
// 		res.render('maintenance.hbs');
// });

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

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
	//req headers what was requested
	//res - can decide what is sent back, status codes
	// res.send('<h2>Hello Express</h2>');
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcome: 'Welcome to my page!',
	})
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