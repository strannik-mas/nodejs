// db.js - тестовый файл
var User = require('./schema/user').User;
var admin2 = new User({
	name: 'root2',
	password: 'pass@word2'
	// еще один : root pass@word1
});
admin2.save(function(err){
	if(err) console.dir(err);
	
});
/* // чтобы убрать ошибку Cannot find module '../build/Release/bson'] code: 'MODULE_NOT_FOUND' } js-bson: Failed to load c++ bson extension, using pure JS version
//replace  bson = require('../build/Release/bson'); to bson = require('../browser_build/bson'); in node_modules/bson/ext/index.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var schemaCat = mongoose.Schema({
	name: String,
	age: Number
});

schemaCat.methods.say = function(){
	console.log('Hello from ' + this.get('name'));
};

var Cat = mongoose.model('Cat', schemaCat);
//var Cat = mongoose.model('Cat', { name: String });

var murzik = new Cat({ name: 'Murzik', age: 5}); */
//var kitty = new Cat({ name: 'Zildjian' });
/* murzik.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('murzik: meow');
  }
});
var barsik = new Cat({ name: 'Barsik', age: "5"});
barsik.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('barsik: meow');
  }
}); */
/* var tuzik = new Cat({ name: 'Tuzik', age: 25});
tuzik.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    //console.log('tuzik: meow');
	  tuzik.say();
  }
}); */

/* var MongoClient = require('mongodb').MongoClient
	, format = require('util').format
  , assert = require('assert');
 
// Connection URL 
var url = 'mongodb://localhost:27017/test';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
 
  db.close();
});

MongoClient.connect(url, function(err, db) {
	if(err) throw err;
	
	var collection = db.collection('test_insert');
	//не сохраняет - чтоб сохраняло npm update
	collection.insert({a:2}, function(err,docs){
		collection.count(function(err, count){
			console.log(format("count = %s", count));
		});
		
		//Locate all the entries using find
		collection.find().toArray(function(err, results) {
		  // Done reading from secondary if available
			console.dir(results);
			db.close();
		})
	});
});  */