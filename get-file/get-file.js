var fs = require('fs');
var getFile = function (fileName){
	return fs.createReadStream(fileName);
}
module.exports = getFile;