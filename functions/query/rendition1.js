/*global globalDocument,isHostMethod,toArray */

/*
 Description:
 Relies on `document.querySelectorAll` and `jessie.toArray`
 Root must be a document or document fragment (no elements)
 */

/*
 Degrades:
 IE7, IE6, IE5.5, IE5, IE4
*/


var query;

if (globalDocument && isHostMethod(globalDocument, 'querySelectorAll') && toArray) {
	query = function(selector, doc) {
		
		// Scaffolding--remove on release
				
		if (1 === doc.nodeType) {
			throw new Error('This rendition of query does not work with element roots');
		}
		
		// End scaffolding
		
		return toArray((doc || document).querySelectorAll(selector));
	};
}