/*global query */

/*
 * Description:
 * Relies on 'jessie.indexOf' and 'jessie.query'
 */

var isInQuery;

if (query && indexOf) {
	isInQuery = function(el, selector, context) {		
		return indexOf(query(selector, context), el);
	};
}