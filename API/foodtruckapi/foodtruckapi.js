var request = require('request');
const util = require('util');

var foodtruckapi = (offset,callback) => {
request({
	url: `https://api.yelp.com/v3/businesses/search?categories=foodtrucks&location="Austin"&limit=50&offset=${offset}`,
	headers: {
		'Authorization' : 'Bearer m3aqkDwoiZL0Ew98GUQN8uisSrZu4x_cZVbe1tMxwTr3TarFE0GlVRD_dD_0img9YSLCrtjx9RLqpApm4P_cQPiGc_Vz26_EGhuGEscfZcjJDs2J0Ldogjx2271PXHYx',
	},
	json: true //its going to be json so convert into object
}, (error,response,body) => {
	if(error){

		callback('Unable to connect to yelp servers');
	}else if(body.total === 0 || body.code === 'NOT_FOUND'){
		callback('Unable to find that address.');

	}else if(body.businesses !== 0){
	//console.log(util.inspect(body, false, null, true /* enable colors */))	// var formattedAddress = body.results[0].formatted_address;
	 // var lat = body.results[0].geometry.location.lat;
	 // var	lng = body.results[0].geometry.location.lng;q
	callback(undefined,body.businesses);
	}
	else{
		console.log(body.businesses);
	}

	});
};

module.exports.foodtruckapi = foodtruckapi;
//