var http = require('http');
var makeRequest = function(msg){
	console.log('request start');
	var options = {
		host: 'localhost',
		port: 8080,
		path: '/',
		method: 'POST'
	};
	var request = http.request(options, function(response){
		console.log('response start');
		response.on('data', function(data){
			console.log(data.toString());
		});
	});
	request.write(msg);
	request.end();
}
module.exports = makeRequest;
//makeRequest("Ura!!");