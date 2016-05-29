console.log(_("[underscore] welcome to our test"));
for(var i = 1; i < 10; i++) {
	console.log(_n("[underscore] we have completed %1 test", "[underscore] we have completed %1 tests", i));
}
console.log(_("[underscore] test completed"));


console.log(__("[double_underscore] welcome to our test"));
for(var i = 1; i < 10; i++) {
	console.log(__n("[double_underscore] we have completed %1 test", "[double_underscore] we have completed %1 tests", i));
}
console.log(__("[double_underscore] test completed"));


console.log(gettext("[gettext] welcome to our test"));
for(var i = 1; i < 10; i++) {
	console.log(ngettext("[gettext] we have completed %1 test", "[gettext] we have completed %1 tests", i));
}
console.log(gettext("[gettext] test completed"));
