/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');
var conf = require('./config');
var log = require('./ext/log');


var app = express();

/* app.use(function(req,res, next){
	console.log('HERE-1');
	next();
});
app.use(function(req,res, next){
	console.log('HERE-2');
	next();
});
app.use(function(req,res, next){
	console.log('HERE-3');
	next();
}); */

//all environmetns
//app.set('port', process.env.PORT || 3000);
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, conf.get('app-view')));
app.set('view engine', conf.get('app-engine'));
//app.use(express.favicon());
app.use(express.logger(conf.get('log-level')));
//можно так:
app.use(express.bodyParser());
/* app.use(express.json());
app.use(express.urlencoded()); */
	
/* //для delete
<input type="hidden" name="_method" value="delete">
app.delete('/25') 
app.use(express.methodOverride());*/

app.use(express.cookieParser());
app.use(express.session({
	secret: conf.get('session:secret'),
	key: conf.get('session:key'),
	cookie: conf.get('session:cookie')
}));


//app.use(app.router);
app.use(express.static(path.join(__dirname, conf.get('app-static'))));

require('./routes')(app);

//c сайта expressjs.com Error handling
//catch 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//development only
if('development' == app.get('env')){
	//app.use(express.errorHandler());
	app.use(function(err, req, res, next) {
	  res.status(err.status || 500);
	  res.render('error', {
		message: err.message,
		error: err,
		title: 'Ошибка'
	  });
	});
}
//для production
app.use(function(err, req, res, next) {
  var err = new Error('Not Found');
  res.status(err.status || 500);
  res.render('error', {
	message: err.message,
	error: {},
	title: 'Ошибка'
  });
});


app.get('/testlog', function(req, res){
	log.info('Hello from log');
	res.end('TEST');
});
//app.get('/', routes.index);
//app.get('/users', user.list);

http.createServer(app).listen(conf.get('port'), function(){
	console.log('Express server listening on port ' + conf.get('port'));
});