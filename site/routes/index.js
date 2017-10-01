/*
 * GET home page.
 */

/* exports.index = function(req, res){
  res.render('index', { title: 'Express' });
}; */
var User = require('../schema/user').User;
var e = require('../ext/error');
module.exports = function(app){

	app.get('/login', function(req, res, next){
		res.render("login", {title:'Login'});
	});

	app.post('/login', function(req, res, next){
		//body - тело post
		var login = req.body.login;
		var pass = req.body.password;
		User.findOne({name: login}, function(err, curUser){
			if(err) next(err);
			if(curUser){
				if(curUser.checkPassword(pass)){
					req.session.user = curUser._id;
					res.status(302);
					res.setHeader("Location", "/");
					res.end();
				}else{
					next(e.setError(401));
				}
			}else{
				next(e.setError(401));
			}
		});
	});
	
	
	app.get('/users/:id', function(req, res, next){
		User.findById(req.param('id'), function(err, users){
			if(err) next(err);
			if(users === null) next(e.setError(404.1, 'User not found'));
			res.json(users);
		});
	});

	app.get('/users', function(req, res, next){
		User.find({}, function(err, users){
			if(err) next(err);
			res.json(users);
		});
	});
	
	app.get('/', function(req, res, next){
		if(req.session.user){
			User.findById(req.session.user, function(err, user){
				if(err) next(err);
				res.render("index", {title:'Наш сайт', name: user.name});
			});
		}else
			res.render("index", {title:'Наш сайт', name: 'Гость'});
	});
};