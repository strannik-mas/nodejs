var fs = require('fs');

var file = fs.createReadStream('../mod_1/file.txt');
var newFile = fs.createWriteStream('file-1.txt');

file.pipe(newFile);