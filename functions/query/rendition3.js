/*global globalDocument,isHostMethod,toArray */

/*
 * Description:
 * Shim for My Library legacy query engine
 * http://www.cinsoft.net/mylib-build.asp?action=Build&version=1.0&dom=on&query=on
 * Relies on 'API.getEBCS'
 * Element or document (or document fragment) root
 */

var query;

if (API && API.getEBCS) {
	query = function(selector, context) {
		return API.getEBCS(selector, context);
	}
}