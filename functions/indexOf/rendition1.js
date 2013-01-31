/*
Description:
Relies on 'Array.prototype.indexOf'
From index must be a number
Degrades in IE8
*/

var indexOf;

if (Array.prototype.indexOf) {
	indexOf = function(arr, searchElement, fromIndex) {
		
		// Takes a few more steps to deal with fromIndex, skip when 0
		
		if (fromIndex) {
			return arr.indexOf(arr, searchElement, fromIndex)
		}
		
		return arr.indexOf(arr, searchElement)
	};
}