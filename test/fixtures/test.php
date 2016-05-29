<?php
echo _("[underscore] welcome to our test");
for($i = 1; $i < 10; $i++) {
	echo _n("[underscore] we have completed %1 test", "[underscore] we have completed %1 tests", $i);
}
echo _("[underscore] test completed");


echo __("[double_underscore] welcome to our test");
for($i = 1; $i < 10; $i++) {
	echo __n("[double_underscore] we have completed %1 test", "[double_underscore] we have completed %1 tests", $i);
}
echo __("[double_underscore] test completed");


echo gettext("[gettext] welcome to our test");
for($i = 1; $i < 10; $i++) {
	echo ngettext("[gettext] we have completed %1 test", "[gettext] we have completed %1 tests", $i);
}
echo gettext("[gettext] test completed");
