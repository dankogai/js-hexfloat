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

#### `parseHexFloat` as a callback

From version 0.4.0, you can use `parseHexFloat` with `String.prototype.replace`.

````javascript
var text = 'e=0x1.5bf0a8b145769p+1, pi=0x1.921fb54442d18p+1';
text.replace(RE_HEXFLOAT_G, parseHexFloat) // 'e=2.718281828459045, pi=3.141592653589793';
````

In the case above, parseHexFloat does not apply regexp by itself.  Instead it just takes its `arguments` as the matched result.

Unfortunately `text.replace(RE_HEXFLOAT, parseHexFloat, 'g')` is not standard so `RE_HEXFLOAT_G` is added.

### `RE_HEXFLOAT`

`RegExp` object used in `parseHexFloat`:

````javascript
/([\+\-]?)0x([0-9A-F]+)\.?([0-9A-F]*)p([\+\-]?[0-9]*)/i
````

### `RE_HEXFLOAT_G`

`RE_HEXFLOAT` with a `g` (global) flag.  See above for usage.

### `Number.prototype.toHexString()`

Stringifies the number as a C99 hexadecimal notation like `"%a"` in C99 `sprintf()`. 

#### Why Canonical Form?

From version 0.3.0, `.toHexString()` always returns the canonical notation.

````javascript
Math.PI.toString(16);   // 3.243f6a8885a3 -> 0x3.243f6a8885a3p0 is valid yet uncanonical
Math.PI.toHexString();  // 0x1.921fb54442d18p+1 is valid and canonical
````

It seems ok to just prepend '0x' and append 'p0' to `.toString(16)` to make a hex float.  Turns out it isn't.  It sometimes drops the last bits in some occasions.

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

* http://www.exploringbinary.com/hexadecimal-floating-point-constants/

## Appendix: HexFloat in Other Languages

* C
  * Standard since C99
  * Literals, output via `%a` in `printf` format, input via `strtod()`, ...
  * https://gcc.gnu.org/onlinedocs/gcc/Hex-Floats.html
* C++
  * Standard since C++11
  * C features plus `std::hexfloat`, ...
  * http://www.cplusplus.com/reference/ios/hexfloat/
* Perl 5
  * Supported since 5.22
  * Pretty much like C99: literals, the `%a` format, `POSIX::strtod()`, ...
  * http://perldoc.perl.org/perl5220delta.html
  * http://www.effectiveperlprogramming.com/2015/06/perl-v5-22-adds-hexadecimal-floating-point-literals/
* Ruby
  * Supported since 1.9?
    * http://docs.ruby-lang.org/ja/1.9.3/doc/print_format.html
    * http://docs.ruby-lang.org/ja/1.8.7/doc/print_format.html
  * No literals, output via `%a` for `sprintf`, input via `Float()`
* Swift
  * Supported from the beginning
  * Literals, output via `String(format:"%a", ...)`, input via `Double()`, ...
  * https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/
