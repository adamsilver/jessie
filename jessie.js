/*Copyright (c) 2012 Jessie

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/


/*
Return URI:
http://127.0.0.1:1337/?appendChild=1&getAncestorByClassName=1&getAncestorByTagName=1&getDescendantsByClassName=1&getDescendantsByTagName=1&getElement=1&getElementParentElement=1&getElementTagName=1&hasClass=1&isDescendant=1&attachBoundListener=1&attachListener=1&cancelDefault=3&cancelPropagation=3&delegateBoundClassNameListener=1&delegateBoundListener=1&delegateListener=1&delegateTagNameListener=1&getEventTarget=2&bind=2&toArray=1
*/

var jessie;
jessie = jessie || {};
(function(global) {
	
	var globalDocument = global.document,
		isHostObjectProperty = function(object, property) {
			var objectProperty = object[property];
			return typeof objectProperty == 'object' && null !== objectProperty;
		},
		isHostMethod = function(object, method) {
			var objectMethod = object[method];
			var type = typeof objectMethod;
			return	type == 'function' ||
					type == 'object' && null !== objectMethod ||
					type == 'unknown';
		},
		areFeatures = function() {
			var i = arguments.length;
			while (i--) {
				if (!jessie[arguments[i]]) {
				return false;
				}
			}
			return true;
		},
		html = isHostObjectProperty(globalDocument, 'documentElement') && globalDocument.documentElement,
		canCall = !!Function.prototype.call,
		isStyleCapable = !!(html && isHostObjectProperty(html, 'style'));



/*
Description:
For both W3C `e.target` and MS `e.srcElement`
*/

/*
See: <a href="https://groups.google.com/forum/#!starred/comp.lang.javascript/uUsSVH7Vcvg">Article</a>
If you will be using a forked rendition to support IE 8-
*/

/*
Degrades:
IE4, IE3, NN4
*/

var getEventTarget;

getEventTarget = function(e) {
	var target = e.target;
	if (target) {
		// Check if not an element (e.g. a text node)
		if (1 != target.nodeType) {
			// Set reference to parent node (which must be an element)
			target = target.parentNode;
		}
	} else {
		target = e.srcElement;
	}
	return target;
};



/*
Description:
Relies on W3C `el.addEventListener`
*/

/*
Degrades:
IE8, IE7, IE6, IE5.5, IE5, IE4, IE3, Opera 7.6
*/

/*
Author:
David Mark
*/

var attachListener;

if(html && isHostMethod(html, 'addEventListener')) {
	attachListener = function(el, eventType, fn) {

		var listener = function(e) {
			fn.call(el, e);
		};

		el.addEventListener(eventType, listener, false);

		return listener;
	};
}



/*
Description:
Relies on `Function.prototype.apply` and `Array.prototype.slice`
*/

/*
Degrades:
IE5, IE4, IE3
*/

/*
Author:
David Mark
*/

var bind;

if(canCall && Array.prototype.slice) {
  bind = function(fn, context) {
    var prependArgs = Array.prototype.slice.call(arguments, 2);

    if (prependArgs.length) {
      return function() {
        fn.apply(context, Array.prototype.concat.apply(prependArgs, arguments));
      };
    }
    return function() {
      fn.apply(context, arguments);
    };
  };
}



/*
Description:
Relies on `jessie.attachListener` and `jessie.getEventTarget` `Function.prototype.call`
*/

/*
Author:
Adam Silver
*/

var delegateListener;

if(attachListener && getEventTarget && canCall) {
	delegateListener = function(el, eventType, fn, fnDelegate) {
			
		var listener = function(e) {
			var currentTarget = fnDelegate(el, getEventTarget(e));
			if(currentTarget) {
				fn.call(currentTarget, e, currentTarget, el);
			}
		};
		
		return attachListener(el, eventType, listener);
	};
}



var getElementTagName;

/*
Description:
Relies on `el.tagName` or `el.nodeName`
*/

getElementTagName = function (el) {
	var tagName = (el.tagName || el.nodeName).toLowerCase();
	return tagName.indexOf('html:') > -1 ? tagName.substring(5) : tagName;
};



/*global globalDocument, isHostObjectProperty*/

var getElementParentElement;

/*
Description:
Relies on `el.parentNode`
*/

/* 
Degrades:
IE5, IE4, IE3
*/


//if(globalDocument && isHostObjectProperty( globalDocument, 'head' ) && isHostObjectProperty(globalDocument.head, 'parentNode')) {
	getElementParentElement = function(el) {
		var parentNode = el.parentNode,
			parentElement = null;

		if(parentNode && (parentNode.tagName || parentNode.nodeType == 1)) {
			parentElement = parentNode;
		}
		return parentElement;
	};
//}



/*
Description:
Relies on `jessie.attachListener`, `jessie.bind` and `jessie.getEventTarget` and `Function.prototype.call`
*/

/*
Author:
Adam Silver
*/

var delegateBoundListener;

if(attachListener && bind && getEventTarget && canCall) {
	delegateBoundListener = function(el, eventType, fn, fnDelegate, thisObject) {
		
		var listener = bind(function(e) {
			var currentTarget = fnDelegate(el, getEventTarget(e));
			if(currentTarget) {
				fn.call(thisObject, e, currentTarget);
			}
		}, thisObject);
		
		return attachListener(el, eventType, listener);
	};
}



/*
Description:
Relies on the `el.classList.contains`
*/

/*
Degrades:
IE9, IE8, IE7, IE6, IE5.5, IE5, IE4, IE3, Chrome 7, FF3.5, Safari 5.0, Opera 11.1, IOS Safari 4.3, Opera Mini 6.0, Opera Mobile 11.0, Android Safari 2.3
*/

/*
Author:
Adam Silver
*/

var hasClass;

if (html && isHostObjectProperty(html, "classList") && isHostMethod(html.classList, "contains") ) {
	hasClass = function(el, className) {
		return el.classList.contains(className);
	};
}




/*
Description:
Relies on `for`
*/

var toArray;

toArray = function(a) {
	var result = [];
	for (var i = 0, l = a.length; i < l; i++) {
		result[i] = a[i];
	}
	return result;
};



/*
Description:
Relies on `jessie.delegateListener` and `jessie.getElementTagName` and `jessie.getElementParentElement`
*/

/*
Author:
Adam Silver
*/

var delegateTagNameListener;

if(delegateListener && getElementTagName) {
	delegateTagNameListener = function(el, eventType, tagName, fn) {

		var fnDelegate = function(el, target) {
			var sourceNode,
				descendant;

			if(getElementTagName(target) === tagName) {
				sourceNode = target;
			} else {
				descendant = getElementParentElement(target);

				while (null !== descendant && descendant !== el) {
					if (getElementTagName(descendant) === tagName) {
						sourceNode = descendant;
						break;
					}
					descendant = getElementParentElement(descendant);
				}
			}
			return sourceNode;
		};

		return delegateListener(el, eventType, fn, fnDelegate);
	};
}



/*
Description:
Relies on `jessie.delegateBoundListener`, `jessie.hasClass`, and `jessie.getElementParentElement`
*/

/*
Author:
Adam Silver
*/

var delegateBoundClassNameListener;

if(delegateBoundListener && hasClass && getElementParentElement) {
	delegateBoundClassNameListener = function(el, eventType, className, fn, thisObject) {

		var fnDelegate = function(el, target) {
			var currentTarget = target;

			if(el === currentTarget) {
				currentTarget = null;
			}

			// traverse up the tree until we find an element with the class or until we find the delegate/el
			while(currentTarget && (currentTarget !== el) && !hasClass(currentTarget, className)) {
				// if we clicked on the delegate/container/el then set to null
				currentTarget = getElementParentElement(currentTarget);
				if(el === currentTarget) {
					currentTarget = null;
				}
			}

			return currentTarget;
		};

		return delegateBoundListener(el, eventType, fn, fnDelegate, thisObject);
	};
}



/*
Description:
Relies on both W3C compliant `e.stopPropagation()` and MS event model `e.cancelBubble`
*/

/*
Degrades:
IE4, IE3, NN4
*/

/*
Author:
Adam Silver
*/

var cancelPropagation;

if(html && isHostMethod(html, 'addEventListener')) {
	cancelPropagation = function(e) {
		e.stopPropagation();
	};
}
else if(html && isHostMethod(html, 'attachEvent')) {
	cancelPropagation = function(e) {
		e.cancelBubble = true;
	};
}



/*
Description:
Relies on MS event model `e.returnValue` and on W3C compliant `e.preventDefault()`
*/

/*
Degrades:
IE4, IE3, NN4
*/

/*
Author:
Adam Silver
*/

var cancelDefault;
	
if(html && isHostMethod(html, 'addEventListener')) {
	cancelDefault = function(e) {
		e.preventDefault();
	};
}
else if(html && isHostMethod(html, 'attachEvent')) {
	cancelDefault = function(e) {
		e.returnValue = false;
	};
}



/*
Description:
Relies on `jessie.bind` and `jessie.attachListener`
*/

/*
Author:
Adam Silver
*/

var attachBoundListener;

if(bind && attachListener) {
	attachBoundListener = function(el, eventType, fn, thisObject) {
		var listener = bind(fn, thisObject);
		thisObject = null;
		return attachListener(el, eventType, listener);
	};
}



/*
Description:
Relies on `el.parentNode` which has very good support
*/

/*
Degrades:
In browsers without `el.parentNode`
*/

var isDescendant;

if(html && 'undefined' != typeof html.parentNode) {
	isDescendant = function(el, elDescendant) {
		var parent = elDescendant.parentNode;
		while(parent && parent != el) {
			parent = parent.parentNode;
		}
		return parent == el;
	};
}



/*
Description:
Basic rendition which relies on valid markup i.e. forms with unique names and ids
*/

/*
See: <a href="https://groups.google.com/forum/#!starred/comp.lang.javascript/fVp-DWAIGnc">Article</a>

That's the most basic rendition: single document and no allowance for
screwy markup like this:

<input name="test">
<input id="test">
*/

/*
Degrades:
IE4, IE3, NN4
*/

/*
Author:
David Mark
*/

var getElement;

if (isHostMethod(document, 'getElementById')) {
	getElement = function(id) {
		return document.getElementById(id);
	};
}



/*
Description:
Relies on `document.getElementsByTagName`
*/

var getDescendantsByTagName;

if(globalDocument && isHostMethod(globalDocument, "getElementsByTagName") && toArray) {
	getDescendantsByTagName = function(el, tagName) {
		return toArray((el || document).getElementsByTagName(tagName));
	};
}



/*
Description:
Relies on `document.getElementsByClassName`
*/

var getDescendantsByClassName;

if(globalDocument && isHostMethod(globalDocument, "getElementsByClassName") && toArray) {
	getDescendantsByClassName = function(el, className) {
		return toArray((el || document).getElementsByClassName(className));
	};
}



/*
Description:
Relies on `jessie.getElementParentElement` and `jessie.getElementTagName`
*/

var getAncestorByTagName;
if(getElementParentElement && getElementTagName){
	getAncestorByTagName = function(el, tagName) {
		el = getElementParentElement(el);
		while (el && tagName && getElementTagName(el) != tagName) {
			el = getElementParentElement(el);
		}
		return el;
	};
}



/*
Description:
Relies on `el.className` property, `jessie.getElementParentElement` and `jessie.hasClass`
*/

var getAncestorByClassName;

if(html && 'string' == typeof html.className && getElementParentElement && hasClass) {
	getAncestorByClassName = function(el, className) {
		el = getElementParentElement(el);
		while (el && !hasClass(el, className)) {
			el = getElementParentElement(el);
		}
		return el;
	};
}



/*
Description:
Relies on `el.appendChild`
*/

/*
Author:
Adam Silver
*/

var appendChild;

if(html && isHostMethod(html, appendChild)) {
	appendChild = function(el, appendEl) {
		return el.appendChild(appendEl);
	};
}


jessie.isHostMethod = isHostMethod;
jessie.isHostObjectProperty = isHostObjectProperty;
jessie.areFeatures = areFeatures;
jessie.getEventTarget = getEventTarget;
jessie.attachListener = attachListener;
jessie.bind = bind;
jessie.delegateListener = delegateListener;
jessie.getElementTagName = getElementTagName;
jessie.getElementParentElement = getElementParentElement;
jessie.delegateBoundListener = delegateBoundListener;
jessie.hasClass = hasClass;
jessie.toArray = toArray;
jessie.delegateTagNameListener = delegateTagNameListener;
jessie.delegateBoundClassNameListener = delegateBoundClassNameListener;
jessie.cancelPropagation = cancelPropagation;
jessie.cancelDefault = cancelDefault;
jessie.attachBoundListener = attachBoundListener;
jessie.isDescendant = isDescendant;
jessie.getElement = getElement;
jessie.getDescendantsByTagName = getDescendantsByTagName;
jessie.getDescendantsByClassName = getDescendantsByClassName;
jessie.getAncestorByTagName = getAncestorByTagName;
jessie.getAncestorByClassName = getAncestorByClassName;
jessie.appendChild = appendChild;

	globalDocument = html = null;

}(this));