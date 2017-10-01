var events = require('events');
var EventEmitter = events.EventEmitter;

var test = new EventEmitter();
test.on('myEvent', onMyEvent);
function onMyEvent(param){
	console.log(arguments[0], arguments[1]);
	//console.log(param);
	//console.log(param.name, param.age);
}
test.emit('myEvent', 'one', 'two');
//test.emit('myEvent', {name:'John', age: 25});
//test.emit('myEvent', 'Test number one');
//test.emit('myEvent', 'Test number two');