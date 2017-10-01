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
	if(req.url == '/index.html' || req.url == "/")
	{
		var stream = fs.createReadStream('./public/index.html');
		var type = "text/html; charset=utf-8";
		/*sendFile(stream, res, type, res.statusCode);
		
		res.writeHead(200, {
			"Content-Type": "text/html; charset=utf-8",
			"Cache-Control": "max-age=3600, must-revalidate"
		});
		
		var stream = fs.createReadStream('./public/index.html');
		stream.pipe(res);
		res.on('close', function() {
			stream.destroy();
		});
		*/
	}
	else if (req.url == '/index.js' || req.url == '/style.css')
	{
		var stream = fs.createReadStream("./public" + req.url);
		var type = "text/plain; charset=utf-8";
		/*
		res.writeHead(200, {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "max-age=3600, must-revalidate"
		});
		var stream = fs.ReadStream("./public" + req.url);
		stream.pipe(res);
		res.on('close', function() {
			stream.destroy();
		});
		*/
	}
	else
	{
		var stream = fs.createReadStream('./public/404.html');
		var type = "text/html; charset=utf-8";
		/*
		res.writeHead(404, {
			"Content-Type": "text/html; charset=utf-8",
			"Cache-Control": "max-age=3600, must-revalidate"
		});
		
		var stream = fs.createReadStream('./public/404.html');
		stream.pipe(res);
		res.on('close', function() {
			stream.destroy();
		});
		*/
	}
	sendFile(stream, res, type)
});

function sendFile(stream, response, type){
	response.writeHead(response.statusCode, {
		"Content-Type": type,
		"Cache-Control": "max-age=3600, must-revalidate"
	});
	stream.pipe(response);
	response.on('close', function(){
		stream.destroy();
	});
}

/*
server.on('listening', function()
{
	console.log("Listen " + (PORT));
});



server.on('request', function(req, res)
{
	console.log("Req: ", req.method, "\n", req.url, "\n", req.headers, "\n", res.statusCode, "\n");
});
*/