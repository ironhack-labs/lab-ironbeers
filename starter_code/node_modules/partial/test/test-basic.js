var test = require('tape');
var partial = require('../')
var m3 = function(x,y,z) {
	return (x*y) + z;
};

// test that you have a function
test('test the partial is a function', function(t) {
  var foo = partial(m3);
  var baz = partial.rapply(m3);

	t.plan(2);
	t.equal('function',typeof foo);
	t.equal('function',typeof baz);
});
// tests basic functionality of partial
test('test basic functionality of partial', function(t) {
  var foo = partial(m3);

	t.plan(3);
	t.equal(foo(2,3,4),10);
	t.equal(foo(2,3)(4),10);
	t.equal(foo(2,3,4),foo(2,3)(4));
});
// test argument loading at start of partial declaration
test('test argument loading at start of partial declaration', function(t) {
  var foo = partial(m3,2,3);
	t.plan(1);
	t.equal(foo(4), 10);
});

// tests basic functionality of partial.rapply
test('test basic functionality of partial right apply', function(t) {
  var baz = partial.rapply(m3);
	t.plan(3);
	t.equal(baz(2,3,4),10);
	t.equal(baz(4)(2,3),10);
	t.equal(baz(2,3,4),baz(4)(2,3));
})

test('test partial with arrays for arguments', function(t) {
  t.plan(2);
  var m = function(logOne, logTwo) {
    return {one:logOne, two:logTwo}
  };
  var foo = partial(m, ['a','b','c']);
  var result = foo('done'); 
  t.equal(typeof foo, 'function')
  t.deepEqual(result, {one:['a','b','c'], two:'done'})
})
