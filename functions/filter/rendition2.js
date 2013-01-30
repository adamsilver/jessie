/*global canCall,forEach */

/*
Description:
Relies on 'jessie.forEach' and 'Array.prototype.push'
*/

/*
Degrades:
IE5
*/

var filter;

if (canCall && forEach && Array.prototype.push) {
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