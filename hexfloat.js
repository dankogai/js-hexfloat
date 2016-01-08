/*
 *  Licensed under the MIT license.
 *  http://www.opensource.org/licenses/mit-license.php
 */
(function (global) {
    // ES5 Required
    if (! Object.defineProperty) {
        throw Error("Object.defineProperty missing");
    }
    var pat_hexfloat  =
        '([\+\-]?)0x([0-9A-F]+)\.?([0-9A-F]*)p([\+\-]?[0-9]+)';
    //   1          2             3           4
    var RE_HEXFLOAT   = new RegExp(pat_hexfloat, 'i');
    var RE_HEXFLOAT_G = new RegExp(pat_hexfloat, 'gi');
    var parseHexFloat = function() {
        var m = arguments.length < 2
            ? RE_HEXFLOAT.exec(arguments[0])
            : arguments;
        if (!m) {
            var mx = (/^([\+\-]?)inf(?:inity)?/i).exec(arguments[0]);
            if (!mx) return NaN;
            return mx[1] == '-' ? -1/0 : 1/0;
        }
        var mantissa = parseInt(m[1] + m[2] + m[3], 16);
        var exponent = (m[4]|0) - 4*m[3].length;
        return mantissa * Math.pow(2, exponent);
    };
    var toHexString = function() {
        if (this == 0.0) {
            return (1/0 !== 1/this ? '-' : '') + '0x0p+0';
        } else if (isNaN(this)) {
            return 'nan';
        }else if (!isFinite(this)) {
            return (this < 0 ? '-' : '') + 'inf';
        } 
        var sign = this < 0 ? '-' : '';
        var a = Math.abs(this);
        var p = 0;
        if (a < 1) {
            while (a < 1)  { a *= 2; p-- }
        } else {
            while (a >= 2) { a /= 2; p++ }
        }
        var es = p < 0 ? '' : '+';
        return sign + '0x' + a.toString(16) + 'p' + es + p.toString(10);
    };
    // install
    [
        [ global, 'parseHexFloat', parseHexFloat ],
        [ Number, 'parseHexFloat', parseHexFloat ],
        [ global, 'RE_HEXFLOAT',   RE_HEXFLOAT ],
        [ global, 'RE_HEXFLOAT_G', RE_HEXFLOAT_G ],
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
})(typeof root === 'object' ? root : this);
