/*global canCall */

/*
 * Description:
 * Fork of 1 and 4
 * Relies on `Function.prototype.call` for browsers without native forEach
 * Contiguous arrays only
 */

var forEach;

if (Array.prototype.forEach) {
	
	// Rendition 1
	
	forEach = function(elements, callback, thisObject) {
		elements.forEach(callback, thisObject);
	};
} else if (canCall) {
	
	// Rendition 4
	
	forEach = function(elements, callback, thisObject) {
		for (var i = 0, l = elements.length; i < l; i++) {
			if (i in elements) {
				callback.call(thisObject, elements[i], i, elements);
			}
		}
	};
}