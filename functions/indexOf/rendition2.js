/*
 * Description:
 * Contiguous arrays only
 * From index must be a number
 */

var indexOf;

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
        if (arr[k] === searchElement) {
            return k;
        }
    }
    
    return -1;
};