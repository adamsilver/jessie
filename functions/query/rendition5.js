/*global globalDocument,isHostMethod,toArray */

/*
 * Description:
 * Quasi-fork of 1 and 3 (with 1 modified to fall back to 3 on exceptions)
 * Shim for My Library legacy query engine
 * http://www.cinsoft.net/mylib-build.asp?action=Build&version=1.0&dom=on&query=on
 * Relies on 'API.getEBCS'
 * Element or document (or document fragment) root
 * Element roots must have ID's
 * Degrades in IE5, NN4
 */

var query;

if (API && API.getEBCS) {
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
			
				// Adjust context and selector to work in document context
				
				context = getOwnerDocument(el);
				
				selector = map(selector.split(','), function(s) {
					return '#' + el.id + ' ' + s 
				}).join(',');			
			}
			
			var result;
			
			// Try to use QSA
			
			try {
				result = toArray((context || document).querySelectorAll(selector));	
			} catch(e) {				
			}
			
			// If browser (e.g. IE8) choked on selector...
			
			if (!result) {
				
				// Use My Library query function
				
				result = API.getEBCS(selector, context);
			}
			
			return result;		
		};
	} else {
		// Use My Library query function
		
		query = function(selector, context) {
			
			// Scaffolding--remove on release
			
			// Enforce ID requirement for symmetry (API.getEBCS doesn't actually need ID's)
			
			if (context && 1 === context.nodeType && !context.id) {
				throw new Error('Root element must have ID');				
			}
			
			// End scaffolding
						
			return API.getEBCS(selector, context);
		}
	}
}