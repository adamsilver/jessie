
/*
Description:
Clone a native [Object] object. Note: Copied properties will NOT be iterable
*/

/*
Degrades:
TBC
*/

/*
Author:
David Mark
*/

var cloneObject;


cloneObject = (function() {
	var Fn = function() {};
	
    return function(o) {
		Fn.prototype = o;
		return new Fn();
    };
})();