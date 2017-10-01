/*
 *	ЗАДАНИЕ 1
 
		1. Скопируйте сюда последнюю рабочую версию кода из файла lab-3.js
		2. Закомментруйте строчки 
				- var fs = require...
				- fs.createReadStream....
		3. Создайте файл get-file.js. 
		4. В файле get-file.js:
				4.1. Подключите модуль fs
				4.2. Опишите ф-цию getFile, которая принимает в качестве аргумента имя файла и возвращает результат выполнения метода createReadStream
				4.3. Экспортируйте ф-цию getFile
				4.4. Сохраните файл get-file.js
		5. Сохраните данный файл
*/		
var fs = require('download_image');		//этот модуль загружает анимированные гифки в favicon 
var msg = require('./logs');
var http = require('http').createServer().listen(8080);
http.on('request', function(req, res){
	res.writeHead(200, {
			"Content-Type": "image/gif"
		});
	msg.info('download start');
	var f2 = fs('28907645_solo_na_klaviature.gif');
	f2.pipe(res);
	msg.info('download finish');
});
//моё
/* var file = require('./get-file')('index.html');
//console.log(file);
file.on('data', function(text){
	//console.log(text.toString());
	process.stdout.write(text.toString(), encoding='utf8');
}
); */
	
/*
 *	ЗАДАНИЕ 2
		
		1. Создайте файл logs.js. 
		2. В файле logs.js:
				2.1. Создайте и опишите три ф-ции: warn, info и error, которые принимают в качестве аргумента строку и выводят её в консоль с соотвествующим префиксом, например "Info: какая-то строка" или "Error: какая-то строка" 
				2.2. Экспортируйте эти ф-ции как методы объекта
				2.3. Сохраните файл logs.js
		3. Сохраните данный файл
*/
/* var Logs = require('./logs');
var node = new Logs();
node.warn('какая-то лажа');
node.info('круто');
node.error('потухло'); */
/*
 *	ЗАДАНИЕ 3
		
		1. В данном файле подключите модули get-file и logs
		2. Сделайте код рабочим, используя модуль get-file
		3. Выведите произвольные сообщения в консоль, используя модуль logs
		4. Сохраните файл. Запустите сервер через консоль. 
		5. Запросите сервер через браузер и убедитесь в корректной работе кода
*/