/*
 * Write your server code in this file.
 */
var http = require('http');
var fs = require('fs');

//define PORT
var PORT = 8080;
PORT = PORT > 1024 && PORT < 65535 ? PORT : 3000;

var server = http.createServer().listen(PORT);
server.on('request', function(req, res){
	var stream;
	var type = "text/html; charset=utf-8";			
	var statusCode = res.statusCode;		
	
	if(req.url == '/index.html' || req.url == "/")
	{
		stream = fs.createReadStream('./public/index.html');
	}
	else if (req.url == '/index.js' || req.url == '/style.css')
	{
		stream = fs.createReadStream("./public" + req.url);
		type = "text/plain; charset=utf-8";
	}
	else
	{
		stream = fs.createReadStream('./public/404.html');
		statusCode = 404;
	}
	sendFile(stream, res, type, statusCode)
});

function sendFile(stream, response, type, statusCode){
	response.writeHead(statusCode, {
		"Content-Type": type,
		"Cache-Control": "max-age=3600, must-revalidate"		//server reads files in `public/` exactly once and caches them
	});
	stream.pipe(response);
	response.on('close', function(){
		stream.destroy();
	});
}