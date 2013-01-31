/*global forEach,canCall*/

/*
Description:
*/

/*
Author:
Graham Veal
*/

var some;

if(canCall) {
	some = function(arr, iterator, context) {

		var i = 0,
			l = rr.length;

		context = context || arr;
		
		for( ; i < l; i++ ){

			if( iterator.call(context, arr[ i ], i, arr) ){
				return true;
			}
		}

		return false;
	};
}
