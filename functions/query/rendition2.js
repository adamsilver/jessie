/*global globalDocument,isHostMethod,toArray */

/*
 * Description:
 * Relies on `document.querySelectorAll` and `jessie.toArray` and 'jessie.getOwnerDocument' and 'jessie.map'
 * Element or document (or document fragment) root
 * Element roots must have ID's
 *
 * Always test the specific queries you intend to use as support varies (particularly in IE8)
 * 
 * var success;
 * 
 * try {
 *    query('.myclass + .yourclass');
 *    success = true;
 * } catch(e) {
 * }

 * 
 * Degrades: IE7
 *  
 */

var query;

if (doc && isHostMethod(doc, 'querySelectorAll') && html && isHostMethod(html, 'querySelectorAll') && toArray && getOwnerDocument && map) {
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