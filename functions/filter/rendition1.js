/*
Description:
Relies on 'Array.prototype.filter'
*/

/*
Degrades:
IE8
*/

var filter;

if (Array.prototype.filter) {
	filter = function(arr, iterator, thisObject) {
		return arr.filter(iterator, thisObject);
	};
}