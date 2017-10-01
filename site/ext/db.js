var db = require('mongoose');
var conf = require('../config');
db.connect(conf.get('db-cnn'));

module.exports = db;