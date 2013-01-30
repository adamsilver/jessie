/*global isOwnProperty */

var fillin;

/*
Description:
Fillin
*/

if(isOwnProperty && Object.prototype.hasOwnProperty) {
	fillin = function(target, source) {
		for(var property in source) {
			if(isOwnProperty(source, property) && !isOwnProperty(target, property)) {
				target[property] = source[property];
			}
		}
	};
}