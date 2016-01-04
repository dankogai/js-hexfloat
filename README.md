[![build status](https://secure.travis-ci.org/dankogai/js-hexfloat.png)](http://travis-ci.org/dankogai/js-hexfloat)

# js-hexfloat

Rudimentary C99 Hexadecimal Floating Point Support in JS

## SYNOPSIS

````javascript
var pi = parseHexFloat('0x1.921fb54442d18p+1'); // 3.14159265358982
var piHex = Math.PI.toHexString();              // '0x1.921fb54442d18p+1'
parseHexFloat(piHex) == Math.PI;                // true
````

## DESCRIPTION

This script adds the following:

### `parseHexFloat(theString)`

Parses C99 hexadecimal floating point in `theString`.  Returns `NaN` if fails.

Unlike `parseInt` and `parseFloat`, the number must be prepended with '0x' and ended with 'p' and exponent in decimal number.

also available as `Number.parseHexFloat()`.

### `RE_HEXFLOAT`

`RegExp` object used in `parseHexFloat`:

````javascript
/([\+\-]?)0x([0-9A-F]+)\.?([0-9A-F]*)p([\+\-]?[0-9]*)/i
````

### `Number.prototype.toHexString()`

Stringifies the number as a C99 hexadecimal notation like `"%a"` in C99 `sprintf()`. 

#### Why Canonical Form?

From version 0.3.0, `.toHexString()` always returns the canonical notation.

````javascript
Math.PI.toString(16);   // 3.243f6a8885a3 -> 0x3.243f6a8885a3p0 is valid yet uncanonical
Math.PI.toHexString();  // 0x1.921fb54442d18p+1 is valid and canonical
````

It seems ok to just prepend '0x' and append 'p0' to `.toString(16)` to make a hex float.  Turns out it isn't.  It sometimes drops the last bit in some platforms.

````
Math.log(2).toString(16)  // 0.b17217f7d1cf78
Math.log(2).toHexString() // 0x1.62e42fefa39efp-1
````

````shell
% perl -E 'say 0x0.b17217f7d1cf78p0 - 0x1.62e42fefa39efp-1'
-1.11022302462516e-16
% perl -E 'say sprintf "%a", 0x0.b17217f7d1cf78p0 - 0x1.62e42fefa39efp-1'
-0x1p-53
````

And `abs(-0x1p-53)` is `DBL_EPSILON`.

## SEE ALSO

* http://en.cppreference.com/w/c/language/floating_constant
* https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html
* http://search.cpan.org/dist/perl-5.22.0/pod/perldelta.pod#Floating_point_parsing_has_been_improved
