/*
 * $Id: hexfloat.js,v 0.1 2016/01/04 09:16:52 dankogai Exp dankogai $
 *
 *  Licensed under the MIT license.
 *  http://www.opensource.org/licenses/mit-license.php
 */
(function (global) {
    // ES5 Required
    if (! Object.defineProperty) {
        throw Error("Object.defineProperty missing");
    }
    var parseHexFloat = function(s) {
        //      1          2           3           4        5
        var m =
            (/^([\+\-]?)0x([0-9A-Z]+).([0-9A-Z]+)p([\+\-]?)([0-9]+)/i)
            .exec(s);
        if (!m) return NaN;
        var sign = m[1] == '-' ? -1 : 1;
        var mantissa = parseInt(m[2] + m[3], 16);
        var esign = m[4] == '-' ? -1 : 1;
        var exponent = esign * (m[5]|0) - 4*m[3].length;
         return sign * mantissa * Math.pow(2, exponent);
    };
    var toHexString = function() {
        var sign = this < 0 ? '-' : '';
        return sign + '0x' + Math.abs(this).toString(16) + 'p0';
    };
    // install
    [
        [ global, 'parseHexFloat', parseHexFloat],
        [ Number, 'parseHexFloat', parseHexFloat],
        [ Number.prototype, 'toHexString', toHexString ]
    ].forEach(function(a){
        var o = a[0], k = a[1], v = a[2];
        if (!o[k]) Object.defineProperty(o, k, {
            value: v,
            enumerable: false,
            writable: true,
            configurable: true
        })
    });
})(this);
