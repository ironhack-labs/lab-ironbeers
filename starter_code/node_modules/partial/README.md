[![Build Status](https://travis-ci.org/rook2pawn/node-partial.svg?branch=master)](https://travis-ci.org/rook2pawn/node-partial)

partial
=======

is simple to use

	var partial = require('partial');
	var foo = function(x,y,z) { return (x*y) + z }
	
	var bar = partial(foo);

and we're done! Now we can simply say

	bar(2,3)(4); // 10
	bar(2)(3,4); // 10
	
	var fix = bar(2,3); 
	fix(4); // 10
	

usage
-----
Simply pass any function to partial, and if you wish, any arguments you want to fix.

	var bar = partial(foo);
	var baz = bar(2,3);

is identical to

	var baz2 = partial(foo,2,3);
	

both can be used like so:

	baz(4); // 10
	baz2(4); // 10

Right side partial function application is through .rapply i.e.

	var bar = partial.rapply(foo);
	var baz = bar(3,7); // y = 3, z = 7
	
	baz(2); // (2*3) + 7 = 13
