
/*
 * Description:
 * Relies on 'Array.prototype.lastIndexOf'
 * Context:
 * Numbers only for fromIndex
 * Degrades in IE8
 */

var lastIndexOf;

if (Array.prototype.lastIndexOf) {
	lastIndexOf = function(arr, searchElement, fromIndex) {
		
		// Takes a few more steps to deal with fromIndex, skip when 0
		
		if (fromIndex) {
			return arr.lastIndexOf(arr, searchElement, fromIndex)
		}
		
		return arr.lastIndexOf(arr, searchElement);
	};
}