/*global globalDocument,isHostMethod,toArray */

/*
 * Description:
 * Just like 2, but tests for basic CSS3 support
 * Relies on `document.querySelectorAll` and `jessie.toArray`
 * Root must be a document or document fragment (no elements) 
 * Degrades in IE8
 * Rendition 3 can be used as fallback for IE8- (use conditional comments)
 */

var query;

if (globalDocument && isHostMethod(globalDocument, 'querySelectorAll') && toArray) {
	
	var queryTests = ['div:even'];
	var queryTestsPassed = true;
	
	try {
		document.querySelectorAll(queryTests[0]);		
	} catch(e) {
		queryTestsPassed = false;
	}
	
	if (queryTestsPassed) {
		query = function(selector, context) {
			
			// If element root...
			
			if (context && 1 === context.nodeType) {
							
				// Scaffolding--remove on release
				
				// If no ID for root...
			
				if (!el.id) {
					throw new Error('Root element must have ID');
				}
			
				// End scaffolding
			
				return toArray(getOwnerDocument(el).querySelectorAll(map(selector.split(','), function(s) { return '#' + el.id + ' ' + s  }).join(',')));
			}
			
			// Document root--default is global document
			
			return toArray((doc || document).querySelectorAll(selector));
		};
	}
}