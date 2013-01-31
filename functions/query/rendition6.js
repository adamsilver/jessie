/*global globalDocument,isHostMethod,toArray */

/*
 * Description:
 * Just like 1, but tests for basic CSS3 support
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
		query = function(selector, doc) {
			
			// Scaffolding--remove on release
					
			if (1 === doc.nodeType) {
				throw new Error('This rendition of query does not work with element roots');
			}
			
			// End scaffolding
			
			return toArray((doc || document).querySelectorAll(selector));
		};
	}
}