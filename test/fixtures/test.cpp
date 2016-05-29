#include <iostream>
using namespace std;

cout << _("[underscore] welcome to our test") << endl;
for (size_t i = 1; i <10; ++i) {
    cout << _n("[underscore] we have completed %1 test", "[underscore] we have completed %1 tests", i) << endl;
}
cout << _("[underscore] test completed") << endl;


cout << __("[double_underscore] welcome to our test") << endl;
for (size_t i = 1; i <10; ++i) {
    cout << __n("[double_underscore] we have completed %1 test", "[double_underscore] we have completed %1 tests", i) << endl;
}
cout << __("[double_underscore] test completed") << endl;


cout << gettext("[gettext] welcome to our test") << endl;
for (size_t i = 1; i <10; ++i) {
    cout << ngettext("[gettext] we have completed %1 test", "[gettext] we have completed %1 tests", i) << endl;
}
cout << gettext("[gettext] test completed") << endl;
