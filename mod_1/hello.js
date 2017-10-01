//сервер
var http = require('http');
/* function foo(request, response){
	response.writeHead(200);
	response.write('Hello world!');
	response.end();
} */
//еще пример создания сервера
/* var server = http.createServer();
server.on('request', function(req, res){});
server.on('close', function(req, res){}); */
	
//создаём сервер
var app = http.createServer(function (request, response){
	response.writeHead(200);
	response.write('Hello world!');
	setTimeout(function(){
		response.write(' Hello is done!');
		response.end('konec');
	}, 5000);
	
	//response.end();
}).listen(8080);

//app.listen(8080);
console.log('Listening on 8080....');