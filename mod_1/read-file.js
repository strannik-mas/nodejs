var fs = require('fs'); //подключение модуля для работы с файлами

//var content = fs.readFileSync('file.txt'); зачитывать файл синхронно

//асинхронно вызов файла
fs.readFile('file.txt', function(err, content){
	console.log(decodeURIComponent(content));
});

console.log('The end');

