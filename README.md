[![build status](https://secure.travis-ci.org/dankogai/js-hexfloat.png)](http://travis-ci.org/dankogai/js-hexfloat)

# js-hexfloat

Rudimentary C99 Hexadecimal Float Support in JS

## SYNOPSIS

````javascript
var pi = parseHexFloat('0x1.921fb54442d18p+1'); // 3.14159265358982
var piHex = Math.PI.toHexString();              // '0x3.243f6a8885a3p0'
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
/([\+\-]?)0x([0-9A-F]+).?([0-9A-F]*)p([\+\-]?[0-9]*)/i
````

### `Number.prototype.toHexString(canonical)`

Stringifies the number as a C99 hexadecimal notation.  Analogous to `"%a"` in C99 `sprintf()`. 

#### CAVEAT

Unless `canonical` is `true`, the result is not canonical.  Canonically the first digit of the number is always `1` and the sign of the exponent is never omitted.

````C
printf("%a\n", -57005.7458343505859375); // prints -0x1.bd5b7ddep+15
````

On the other hand, this implementation takes  advangage of the fact `Number.prototype.toString(16)` works for floating point numbers.  It just checks the number is negative and prepends '-' if so, then prepend '0x', and append 'p0'.

````javascript
console.log((-57005.7458343505859375).toHexString());     // -0xdead.beefp0
console.log((-57005.7458343505859375).toHexString(true)); // -0x1.bd5b7ddep+15
````

Even when not canonical, you can use the result interchangeably with C99 and other platforms that support the notation (C++11, Ruby, Perl 5.22 ...).

## SEE ALSO

* http://en.cppreference.com/w/c/language/floating_constant
* https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html
* http://search.cpan.org/dist/perl-5.22.0/pod/perldelta.pod#Floating_point_parsing_has_been_improved
