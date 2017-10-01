/*
 *	ЗАДАНИЕ 1
	
		1. Подключите модули 'url', 'request', 'express' и 'ejs'
		2. Откройте в браузере страницу по адресу http://internet.yandex.ru/
		3. Создайте переменную myIP и присвойте ей ip-адрес указанный в строке "Мой IPv4"
		4. Создайте переменную app - сервер, созданный на основе фреймворк express
		5. Поставьте сервер на "прослушку" порта 8080
		6. Укажите, где находятся файлы для представлений с помощью переменной __dirname, указывающую на текущую директорию
*/ 
var url = require('url');
var express = require('express');
var request = require('request');
var ejs = require('ejs');
var MY_IP = '178.165.65.61';

var app = express();
app.listen(8080);

app.set('views', __dirname);
app.set('view engine', 'ejs');


/*
 *	ЗАДАНИЕ 2
 
		1. Создайте файл представления для вывода результатов поиска по фидам:
			<h3>Результат поиска по <%= keyword %></h3>
			<dl>
				<% feeds.entries.forEach(function(feed){ %>
					<dt><a href="<%- feed.link%>"><%- feed.title %></a></dt>
					<dd><%- feed.contentSnippet %></dd>
				<% }); %>
			</dl>
		2. Сохраните файл в текущей директории под именем google-search.ejs
*/

/*
 *	ЗАДАНИЕ 3
 
		1. Создайте для сервера обработчик метода GET, который обрабатывает обращение к адресу: /google/feeds/for/:search 
				(например: http://localhost:8080/google/feeds/for/RUSSIA)
		2. Получите значение, параметра :search (в примере: RUSSIA)
		3. Создайте объект options с параметрами protocol, host, pathname, query для формирования url вида
				http://ajax.googleapis.com/ajax/services/feed/find?v=1.0&userip=195.19.32.197&q=RUSSIA
				- значение параметра 'userip' должно соответствовать значению переменной myIP
				- значение параметра 'q' должно соответствовать значению полученного параметра :search
		4. Сформируйте нужный url с помощью метода format объекта url (помните, вы подключили модуль 'url'?)
		5. Вызовите функцию request (помните, вы подключили модуль 'request'?) передав ей первым параметром сформированный url и вторым параметром функцию обратного вызова
		6. Функция обратного вызова должна прнимать три аргумента: err, res и body. В переменную body придет ответ в виде строки в формате JSON. Эту строку необходимо распарсить как:
				var feeds = JSON.parse(body);
			В переменной feeds должен появится объект
		8. Заполните представление используя метод render объекта response как:
				response.render('google-search.ejs', {feeds: feeds.responseData, keyword: search});
		9. Сохраните файл и запустите сервер через консоль
		10. Запросите сервер через браузер и убедитесь в корректной работе кода
*/
app.get('/google/feeds/for/:search', function(req, response){
	var search = req.params.search;
	//формируем url
	var options = {
		protocol: 'http',
		host: 'ajax.googleapis.com',
		pathname: '/ajax/services/feed/find',
		query: {v:'1.0' , userip:MY_IP, q:search}
	};
		
	var needUrl = url.format(options);
	
	//используем модуль request
	request(needUrl, function(err, res, body){
		//console.log(body);
		var feeds = JSON.parse(body);
		response.render('google-search', {feeds: feeds.responseData, keyword: search});
	});
	
});

/*
	Если останется время (или задание на дом)
*/

/*
 *	ЗАДАНИЕ 4 
	
		1. Создайте файл представления для вывода новостей Яндекса:
				<h3><%= count %> последних новостей от Яндекс в категории <%= category %></h3>
				<dl>
					<% news.entries.forEach(function(item){ %>
						<dt><a href="<%- item.link%>"><%- item.title %></a></dt>
						<dd><%- item.contentSnippet %></dd>
					<% }); %>
				</dl>
		2. Сохраните файл в текущей директории под именем yandex-news.ejs
*/

/*
 *	ЗАДАНИЕ 5
 
		1. Создайте для сервера обработчик метода GET, который обрабатывает обращение к адресу: /yandex/:cnt/news/for/:search 
				(например: http://localhost:8080/yandex/10/news/for/auto)
		2. В отличие от Задания 3, сформированный URL должен выглядеть как:
				http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&userip=195.19.32.197&num=10&q= http://news.yandex.ru/CATEGORY.rss				
				- значение параметра 'num' должно соответствовать значению полученного параметра :cnt	
				- вместо подстроки CATEGORY должно стоять значение полученного параметра :search
				http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&userip=195.19.32.197&num=10&q= http://news.yandex.ru/sport.rss
		3. Заполните представление используя метод render объекта response как:
				response.render('yandex-news.ejs', {news: feeds.responseData.feed, category: search, count: cnt});
		4. Сохраните файл и запустите сервер через консоль
		5. Запросите сервер через браузер и убедитесь в корректной работе кода, передавая значения для категории:
				auto, world, internet, sport, culture, movies, politics
				
*/
var categories = {
	'auto' : 'Автомобили', 
	'world' : 'В мире', 
	'internet' : 'Интернет', 
	'sport' : 'Спорт', 
	'culture' : 'Культура', 
	'movies' : 'Кино', 
	'politics' : 'Политика',
	'index' : 'Главные новости'
};

app.get('/yandex/:cnt/news/for/:search', function(req, response){
	var search = req.params.search.toLowerCase();
	if(!(search in categories))
		search = 'index';
	var name = categories[search];
	var cnt = req.params.cnt;
	//формируем url
	var options = {
		protocol: 'http',
		host: 'ajax.googleapis.com',
		pathname: '/ajax/services/feed/load',
		query: {
				v:'1.0',
				userip:MY_IP,
				num:cnt,
				q:'http://news.yandex.ru/' + search + '.rss'
				}
	};
		
	var needUrl = url.format(options);
//console.log(needUrl);
	//используем модуль request
	request(needUrl, function(err, res, body){
		//console.log(body);
		var news = JSON.parse(body);
		//response.render('yandex-news', {news: news.responseData.feed, category: name, count: cnt});
		response.render('yandex-news', {news: news.responseData.feed, category: news.responseData.feed.title, count: cnt});
	});
	
});