/*global query */

/*
 * Description:
 * Relies on 'el.matchesSelector', 'jessie.findProprietaryMethod'
 * Experimental--host method is relatively new and unproven (and implementations use vendor prefixes)
 * Use with:
 * query 1, query 2 (just those renditions that use QSA *exclusively*)
 * Degrades in:
 * IE 8, FF 3.5, Safari 4, Opera 11.1, iOS 3.2, Android 2.1, Opera Mobile 11
 */

html = document.documentElement;
isHostMethod = function(object, method) {
			var objectMethod = object[method];
			var type = typeof objectMethod;
			return	type == 'function' ||
					type == 'object' && null !== objectMethod ||
					type == 'unknown';
		}

var isInQuery;

if (html) {
	(function() {
		var foundPrefix, methodName;
		
		if (isHostMethod(html, 'matchesSelector')) {
			methodName = 'matchesSelector';			
		} else {			
			var prefixes = ['ms', 'o', 'webkit', 'moz'];
			
			for (var i = prefixes.length; i-- && !foundPrefix;) {
				if (isHostMethod(html, prefixes[i] + 'MatchesSelector')) {
					foundPrefix = i;
				}
			}
			
			if (foundPrefix) {		
				methodName = prefixes[foundPrefix] + 'MatchesSelector';		
			}
		}
		
		if (methodName) {
			isInQuery = function(el, selector, context) {
				return el[methodName](selector, context);
			};
		}

	})();
}
