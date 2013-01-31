/*global canCall */

/*
 * Description:
 * Fork of 1 and 2
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
	
	// Rendition 2
	
	forEach = function(elements, callback, thisObject) {
		for (var i = 0, l = elements.length; i < l; i++) {
			callback.call(thisObject, elements[i], i, elements);
		}
	};
}