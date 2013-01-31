/*
 * Description:
 * 
 * Fork of Rendition 1 and 2, inherits most restrictive context (2)
 * Context:
 * Contiguous arrays only
 * From index must be a number
 */

var lastIndexOf;

if (Array.prototype.lastIndexOf) {
	
	// Rendition 1
	
	lastIndexOf = function(arr, searchElement, fromIndex) {
		
		// Takes a few more steps to deal with fromIndex, skip when 0
		
		if (fromIndex) {
			return arr.lastIndexOf(arr, searchElement, fromIndex)
		}
		
		return arr.lastIndexOf(arr, searchElement);
	};
} else {
	
	// Rendition 2
	
	lastIndexOf = function(arr, searchElement, fromIndex) {
	    var len = arr.length >>> 0;
	    
	    if (!len) {
	        return -1;
	    }
	    var n = fromIndex || 0;
	    
	    if (n >= len) {
	        return -1;
	    }

	    // Figure absolute start index (negative 'fromIndex' counts from first)
	    
	    var k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n);
	    
	    for (; k < len; k++) {
	        if (arr[k] === searchElement) {
	            return k;
	        }
	    }
	    
	    return -1;
	};
}