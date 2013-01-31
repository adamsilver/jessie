/*global */

var getValue;

/*
Description:
getValue
*/

getValue = function( elInput, default ) {
	var propertyName = default ? 'defaultValue' : 'value';
	
	
	
	return elInput[propertyName];
};