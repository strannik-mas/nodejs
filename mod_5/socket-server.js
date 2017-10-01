var soket = require('socket.io');
var express = require('express');
var app = express();
var io = soket.listen(app.listen(8080));

app.set('views', __dirname);
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

//подключаем папку для статических файлов
app.use(express.static(__dirname+'/f1'));


/*io.set('log level', 3);		//какую инфу показывать (ошибки, предупр...) - не работает, надо через LocalStorage.debug
	*/

app.get('/', function(req, res){
	//res.send('Hello so');
	//res.sendfile(__dirname + '/index.html');
	
	res.render('page');
});
io.sockets.on('connection', function(client){
	//console.log('Connected');
	//client.emit('message', {hello: 'Guest'});
	client.on('message', function(data){
		//console.log(data);
		client.emit('hello', {hello: 'Привет ' + data});
		//сохраняем старое имя
		//client.set('nickname', data);
		
		//пошлем сообщения всем
		client.broadcast.emit('hello', {hello: 'Привет от хрома и от ' + data});
		//io.sockets.emit('hello', {hello: 'Привет всем'})
	});
	
	client.on('new_message', function(data){
		
		client.emit('hello', {hello: 'Привет ' + data});
		/* //get не работает
		client.get('nickname', function(err, oldName){
			client.broadcast.emit('hello', {hello: oldName + ' теперь ' + data});
		});
		client.set('nickname', data); */
	});

	client.on('disconnect', function(){
		io.sockets.emit('hello', {hello: 'Один из нас свалил'})
	});
});