var partial = function() {
  var _args = Array.from(arguments);
	var fn = _args[0];
  var args = _args.slice(1);
	return function() {
		if (arguments.length + args.length >= fn.length) {
      var x = args.concat(Array.from(arguments));
			return fn(...x);
		} else {	
      var x = args.concat(Array.from(arguments));
			return partial(fn,...x)
		}
	};
};
partial.rapply = function() {
  var _args = Array.from(arguments);
	var fn = _args[0];
  var args = _args.slice(1);
	return function() {
		if ((arguments.length + args.length) >= fn.length) {
      var x = Array.from(arguments).concat(args);
			return fn(...x);
		} else {	
      var x = Array.from(arguments).concat(args);
			return partial.rapply(fn,...x);
		}
	};
};
var exports = module.exports = partial;
