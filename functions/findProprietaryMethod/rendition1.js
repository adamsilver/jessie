/*global html, capitalize */

var findProprietaryMethod;

/* Description:
 * 
 * Relies on:
 * 'jessie.capitalize'
 * 
 * Returns:
 * string (empty if no method found)
 * 
 */

// If documentElement exists...

if (html && capitalize) {
	findProprietaryMethod = function(methodName, el) {
		var i, prefixes, foundPrefix, methodNameCapitalized = capitalize(methodName);
		
		// If optional element reference not provided...
		// NOTE: By convention, literal value goes on LHS, though doesn't buy anything here
		
		if (!el) {
			
			// Use documentElement by default
			
			el = html;
		}
		
		// If standard method exists, skip to return passed method name
		
		// If standard method does NOT exist...
		
		if (!isHostMethod(el, methodName)) {
			
			// NOTE: This array is redundant (see findProprietaryStyle renditions)--needs UID block
			
			prefixes = ['khtml', 'ms', 'o', 'webkit', 'moz'];
			
			// Loop through prefixes, breaks out if vendor prefix found
			
			for (i = prefixes.length; i-- && !foundPrefix;) {
				
				// If proprietary method exists...
				
				if (isHostMethod(el, prefixes[i] + methodNameCapitalized)) {
					
					// Save and break out of loop
					
					foundPrefix = i;
				}
			}
			
			// If did NOT find a match...
			
			if (undefined === foundPrefix) {
				
				// Indicate with empty string result
				
				methodName = '';
			} else {
				
				// Set proprietary method name
				
				methodName = foundPrefix ? prefixes[foundPrefix] + methodNameCapitalized : '';		
			}
		}
		
		// Return result
		
		return methodName; // string
	};
}