/*global canCall */

/*
 * Description:
 * Relies on `Function.prototype.call` for browsers without native forEach
 * Degrades in IE5
 */

var forEach;

if (canCall) {
	forEach = function(elements, callback, thisObject) {
		for (var i = 0, l = elements.length; i < l; i++) {
			if (i in elements) {
				callback.call(thisObject, elements[i], i, elements);
			}
		}
	};
}