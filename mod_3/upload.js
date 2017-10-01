var fs = require('fs');
var http = require('http').createServer().listen(8080);
http.on('request', function(req, res){
	res.writeHead(200);
	//готовим поток для записи
	var newFile = fs.createWriteStream('file-4.txt');
	//req.pipe(newFile);
	req.on('data', function(txt){
		//txt = 'NEW: ' + txt;
		var buffer = newFile.write(txt);	//false если полон буфер
		if(!buffer) {
			console.log('PAUSE');
			req.pause();
		}
	});
	//событие, срабатывающее когда освободится поток
	newFile.on('drain', function(){
		req.resume();
	});
	req.on('end', function(){
		res.end('UPLOADED!');
	});
});