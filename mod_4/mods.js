var h = require("./say-hello");		//пришла ф-я
var w = require("./say-world");		//пришел объект со свойством, которое будет функцией
var mod = require("./my-module");


h();
//w.world();
require("./say-world").world();
mod.foo();
mod.bar();