/*
 * Description:
 *
 * Context:
 * Contiguous arrays only
 */

var lastIndexOf;

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