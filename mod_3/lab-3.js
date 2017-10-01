/*
 *	ЗАДАНИЕ 1
 
		1. Подключите модуль 'fs'
		2. Создайте поток для чтения файла index.html
		3. Опишите для события data функцию обратного вызова, которая выводит в консоль содержимое файла index.html
		4. Сохраните файл, запустите его в консоли и убедитесь в корректной работе кода
*/
var fs = require('fs');
var file = fs.createReadStream('index.html');
/* file.on('data', function(text){
	//console.log(text.toString());
	process.stdout.write(text.toString(), encoding='utf8');
}
); */
/*
 *	ЗАДАНИЕ 2
 
		1. Измените вывод в консоль, используя вместо объекта консоль объект process
		2. Сохраните файл, запустите его в консоли и убедитесь в корректной работе кода
*/

/*
 *	ЗАДАНИЕ 3

		1. Измените код, чтобы вместо "прослушки" события data, содержимое файла отдавалось напрямую через метод потока pipe
		2. Сохраните файл, запустите его в консоли и убедитесь в корректной работе кода 
*/
file.pipe(process.stdout);
/*
 *	ЗАДАНИЕ 4

		1. Создайте HTTP-сервер, который будет отдавать по запросу картинку logo.gif, используя метод потока для чтения pipe
		2. Сохраните файл и запустите сервер через консоль 
		3. Запросите сервер через браузер и убедитесь в корректной работе кода 
*/

var http = require('http').createServer().listen(8080);
http.on('request', function(req, res){
	res.writeHead(200, {
			"Content-Type": "image/gif"
		});
	var f2 = fs.createReadStream('logo.gif');
	f2.pipe(res);
	
});