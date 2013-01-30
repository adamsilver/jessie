/*global canCall,forEach */

/*
Description:
Forked rendition
*/

/*
Degrades:
IE5
*/

var filter;

if (Array.prototype.filter) {
	filter = function(arr, iterator, thisObject) {
		return arr.filter(iterator, thisObject);
	};
} else if (canCall && forEach && Array.prototype.push) {
	filter = function(arr, iterator, thisObject) {
		
		var result = [];
		
		forEach(arr, function(value) {
			if (iterator.call(thisObject, value)) {
				result.push(value);
			}
		});
		
		return result;
	};
}