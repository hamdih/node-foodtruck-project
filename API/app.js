var request = require('request');
var yargs = require('yargs');
const foodtruckapi = require('./foodtruckapi/foodtruckapi.js');
//const weather = require('./weather/weather.js');


const argv = yargs
	.options({
		o: {
			alias: 'offset',
			demand: true,
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;
//callback
foodtruckapi.foodtruckapi(argv.offset,(errorMessage,results) =>{
	if(errorMessage){
		console.log(errorMessage);
	}else{


		// weather.getWeather(results.Latitude,results.Longitude, (errorMessage,weatherResults) => {
		// 	if(errorMessage){
		// 		console.log(errorMessage);
		// 	}else{
		// 		console.log(`It is Currently ${weatherResults.temp} and it will be ${weatherResults.summary}`);
		// 	}
		// });
	}
});

