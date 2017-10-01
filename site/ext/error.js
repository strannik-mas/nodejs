http = require('http');
function setError(num, msg){
	msg = msg || http.STATUS_CODES[num]; //второе значение если msg не пришел
	//можно вытаскивать через константы-сообщения в соответствии со статусом
	var err = new Error(msg);
	err.status = num || 404;
	return err;
};
module.exports.setError = setError;