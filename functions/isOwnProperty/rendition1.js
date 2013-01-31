var isOwnProperty;

/*
Author:
David Mark
*/

/*
Degrades:
In browsers without `Object.prototype.hasOwnProperty`
*/

if(Object.prototype.hasOwnProperty) {
	isOwnProperty = function(o, p) {
		return o.hasOwnProperty(p);
	};
}