/*
 * $Id: 00-basic.js,v 0.4 2016/01/08 03:58:34 dankogai Exp dankogai $
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

describe('Basic', function () {
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
describe('Extreme', function () {
    it('parseHexFloat("+0x0p+0") == ' + 0.0,
       is(parseHexFloat('+0x0p+0'), 0.0));
    it('(0.0).toHexString() == "0x0p+0"',
       is((0.0).toHexString(), '0x0p+0'));
    it('parseHexFloat("-0x0p+0") == ' + 0.0,
       is(parseHexFloat('-0x0p+0'), -1.0*0.0));
    it('(-1.0*0.0).toHexString() == "-0x0p+0"',
       is((-1.0*0.0).toHexString(), '-0x0p+0'));
    it('parseHexFloat("inf") == ' + 1/0,
      is(parseHexFloat('inf'), 1/0));
    it('(1/0).toHexString() == "-inf"',
       is((-1/0).toHexString(), '-inf'));
    it('parseHexFloat("-inf") == ' + -1/0,
      is(parseHexFloat('-inf'), -1/0));
    it('(-1/0).toHexString() == "-inf"',
       is((-1/0).toHexString(), '-inf'));
    it('parseHexFloat("uninfected") == ' + NaN,
       is(isNaN(parseHexFloat('uninfected')), true));
    it('(0/0).toHexString() == "nan"',
       is((0/0).toHexString(), 'nan'));
});
