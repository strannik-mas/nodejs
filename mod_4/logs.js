/* function Logs(){
	this.warn = function(str){
		console.log("\nWarning: "+str);
	};
	this.info = function(str){
		console.log("\nInfo: "+str);
	};
	this.error = function(str){
		console.log("\nError: "+str);
	};
}
module.exports = Logs; */

warn = function(str){
		console.log("\nWarning: "+str);
	};
info = function(str){
	console.log("\nInfo: "+str);
};
error = function(str){
	console.log("\nError: "+str);
};
exports.warn = warn;
exports.info = info;
exports.error = error;