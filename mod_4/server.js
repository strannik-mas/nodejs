//сервер
var http = require('http');

http.createServer(function (request, response){
	console.log('Server listen');
	response.writeHead(200);
	request.on('data', function(data){
		console.log('Request: ', data.toString());
		response.write('Write: ' + data.toString());
	});
	request.on('end', function(){
		console.log('the end');
	});
	//response.end();
}).listen(8080);