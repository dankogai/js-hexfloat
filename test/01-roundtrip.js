/*
 * $Id: 01-roundtrip.js,v 0.2 2016/01/08 04:03:25 dankogai Exp dankogai $
 *
 * use mocha to test me
 * http://visionmedia.github.com/mocha/
 */
if (this['window'] !== this) {
    assert = require("assert");
    require('../hexfloat.js');
}
var is = function (a, e, m) {
    return function () {
        assert.equal(a, e, m)
    }
};

describe('Roundtrip', function () {
    var d = 1, f = 1;
    for (var i = 0; i < 54; i++) {
        var s = d.toHexString();
        it('('+d+').toHexString() == "'+s+'"', is(s, d.toHexString()));
        it('parseHexFloat("'+s+'") == '+d, is(parseHexFloat(s), d ));
        f /= 2, d += f;
    }
});
