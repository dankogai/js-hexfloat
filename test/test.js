/*
 * $Id: test.js,v 0.3 2016/01/05 07:13:40 dankogai Exp dankogai $
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

var dead_beef = 57005.7458343505859375;
var src = 'e=0x1.5bf0a8b145769p+1, pi=0x1.921fb54442d18p+1';
var dst = 'e=2.718281828459045, pi=3.141592653589793';

describe('Hexadecimal Float', function () {
    it('Math.PI == 0x1.921fb54442d18p+1',
       is(parseHexFloat('0x1.921fb54442d18p+1'), Math.PI));
    it('-Math.PI == -0xc.90fdaa22168c235p-2',
       is(parseHexFloat('-0xc.90fdaa22168c235p-2'), -Math.PI));
    it('parseHexFloat(Math.PI.toHexString()) == Math.PI',
       is(parseHexFloat(Math.PI.toHexString()), Math.PI));
    it('Math.E == 0x1.5bf0a8b145769p+1',
       is(parseHexFloat('0x1.5bf0a8b145769p+1'), Math.E));
    it('-Math.E == -0xa.df85458a2bb4a9bp-2',
       is(parseHexFloat('-0xa.df85458a2bb4a9bp-2'), -Math.E));
    it('parseHexFloat(Math.E.toHexString()) == Math.E',
       is(parseHexFloat(Math.E.toHexString()), Math.E));
    it('0xdead.beefp0 == '+dead_beef,
       is(parseHexFloat('0xdead.beefp0'), dead_beef));
    it('('+dead_beef+').toHexString() == 0x1.bd5b7ddep+15',
       is((dead_beef).toHexString(), '0x1.bd5b7ddep+15'));
    it('(1/'+dead_beef+')toHexString() == 0x1.264eb565bf921p-16',
       is((1/dead_beef).toHexString(), '0x1.264eb565bf921p-16'));
    it('0xdead.beefp0 == 0x1.bd5b7ddep+15',
       is(parseHexFloat('0xdead.beefp0'), parseHexFloat('0x1.bd5b7ddep+15')));
    it('-0x1p-42 == -Math.pow(2, -42)',
        is(parseHexFloat('-0x1p-42'), -Math.pow(2, -42)));
    it('isNaN(parseHexFloat("nonsense"))',
       is(isNaN(parseHexFloat('nonsense')), true));
    it('0x1p-1074 == Number.MIN_VALUE',
       is(parseHexFloat('0x1p-1074'), Number.MIN_VALUE));
    it('Number.MIN_VALUE.toHexString()',
       is(Number.MIN_VALUE.toHexString(), '0x1p-1074'));
    it('0x1.fffffffffffffp+1023 == Number.MAX_VALUE',
       is(parseHexFloat('0x1.fffffffffffffp+1023'), Number.MAX_VALUE));
    it('Number.MAX_VALUE.toHexString()',
       is(Number.MAX_VALUE.toHexString(), '0x1.fffffffffffffp+1023'));
    it('str.replace(RE_HEXFLOAT_G, parseHexFloat)',
       is(src.replace(RE_HEXFLOAT_G, parseHexFloat), dst));
});
