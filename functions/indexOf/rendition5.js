/*
 * Description:
 * Relies on 'Array.prototype.indexOf'
 * Fork of Rendition 1 and 4, inherits most restrictive context (4)
 * Context:
 * From index must be a number
 * Degrades in IE4, NN4
 */

var indexOf;

if (Array.prototype.indexOf) {
	
	// Rendition 1
	
	indexOf = function(arr, searchElement, fromIndex) {
		
		// Takes a few more steps to deal with fromIndex, skip when 0
		
		if (fromIndex) {
			return arr.indexOf(arr, searchElement, fromIndex)
		}
		
		return arr.indexOf(arr, searchElement)
	};
} else {
	
	// Rendition 4
	
	indexOf = function(arr, searchElement, fromIndex) {
	    var len = arr.length >>> 0;
	    
	    if (!len) {
	        return -1;
	    }
	    
	    var n = fromIndex || 0;
	    
	    if (n >= len) {
	        return -1;
	    }
	    
	    // Figure absolute start index (negative 'fromIndex' counts back from last)
	    
	    var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
	    
	    for (; k < len; k++) {
	        if (k in arr && arr[k] === searchElement) {
	            return k;
	        }
	    }
	    
	    return -1;
	};
}