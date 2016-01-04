/*
 * $Id: test.js,v 0.1 2016/01/04 09:17:08 dankogai Exp dankogai $
 *
 * use mocha to test me
 * http://visionmedia.github.com/mocha/
 */
var assert, G;
if (this['window'] !== this) {
    assert = require("assert");
    G = require('../hexfloat.js');
} else {
    G = this;
}
var is = function (a, e, m) {
    return function () {
        assert.equal(a, e, m)
    }
};

describe('Hexadecimal Float', function () {
    it('Math.PI == 0x1.921fb54442d18p+1',
       is(G.parseHexFloat('0x1.921fb54442d18p+1'), Math.PI));
    it('-Math.PI == -0xc.90fdaa22168c235p-2',
       is(G.parseHexFloat('-0xc.90fdaa22168c235p-2'), -Math.PI));
    it('parseHexFloat(Math.PI.toHexString()) == Math.PI',
       is(G.parseHexFloat(Math.PI.toHexString()), Math.PI));
    it('Math.E == 0x1.5bf0a8b145769p+1',
       is(G.parseHexFloat('0x1.5bf0a8b145769p+1'), Math.E));
    it('-Math.E == -0xa.df85458a2bb4a9bp-2',
       is(G.parseHexFloat('-0xa.df85458a2bb4a9bp-2'), -Math.E));
    it('parseHexFloat(Math.E.toHexString()) == Math.E',
       is(G.parseHexFloat(Math.E.toHexString()), Math.E));
    it('0xdead.beefp0 == 57005.7458343505859375',
       is(G.parseHexFloat('0xdead.beefp0'), 57005.7458343505859375));
    it('57005.7458343505859375 == 0xdead.beefp0',
       is((57005.7458343505859375).toHexString(), '0xdead.beefp0'));
    it('(57005.7458343505859375).toHexString(true)',
       is((57005.7458343505859375).toHexString(true), '0x1.bd5b7ddep+15'));
    it('0xdead.beefp0 == 0x1.bd5b7ddep+15',
       is(G.parseHexFloat('0xdead.beefp0'),
          G.parseHexFloat('0x1.bd5b7ddep+15')));
    it('-0x1p-42 == -Math.pow(2, -42)',
        is(G.parseHexFloat('-0x1p-42'), -Math.pow(2, -42)));
    it('isNaN(parseHexFloat("nonsense"))',
       is(isNaN(G.parseHexFloat('nonsense')), true));
});
