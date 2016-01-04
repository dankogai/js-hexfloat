/*
 * $Id: hexfloat.js,v 0.3 2016/01/04 17:53:08 dankogai Exp dankogai $
 *
 *  Licensed under the MIT license.
 *  http://www.opensource.org/licenses/mit-license.php
 */
(function (global) {
    // ES5 Required
    if (! Object.defineProperty) {
        throw Error("Object.defineProperty missing");
    }
    var RE_HEXFLOAT =
        /([\+\-]?)0x([0-9A-F]+).?([0-9A-F]*)p([\+\-]?[0-9]*)/i;
    //   1          2            3           4
    var parseHexFloat = function(s) {
        var m = RE_HEXFLOAT.exec(s);
        if (!m) return NaN;
        var mantissa = parseInt(m[1] + m[2] + m[3], 16);
        var exponent = (m[4]|0) - 4*m[3].length;
        return mantissa * Math.pow(2, exponent);
    };
    var toHexString = function() {
        var sign = this < 0 ? '-' : '';
        var a = Math.abs(this);
        var p = 0;
        if (a < 1) {
            while (a < 1) { a *= 2; p-- }
        } else {
            while (a > 2) { a /= 2; p++ }
        }
        var es = p < 0 ? '' : '+';
        return sign + '0x' + a.toString(16) + 'p' + es + p.toString(10);
    };
    // install
    [
        [ global, 'parseHexFloat', parseHexFloat],
        [ Number, 'parseHexFloat', parseHexFloat],
        [ global, 'RE_HEXFLOAT',   RE_HEXFLOAT],
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
