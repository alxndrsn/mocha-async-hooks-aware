if(!process.env.MOCHA_NO_ASYNC_PROTECTION) require('../src');

const { AsyncLocalStorage } = require('async_hooks');
const { assert } = require('chai');

const als = new AsyncLocalStorage();

describe('mocha-async-hooks-aware', () => {
  describe('context leakage through it() callback', () => {
    let wasCalled;
    beforeEach(() => wasCalled = false);
    afterEach(() => assert.isTrue(wasCalled));

    it('should see store value inside run()', done => {
      wasCalled = true;

      // when
      als.run('some-value', () => {

        // expect
        assert.equal(als.getStore(), 'some-value');

        done();
      });
    });

    it('should not see value leaked after done() callback of previous test', () => {
      wasCalled = true;

      // expect
      assert.isUndefined(als.getStore());
    });
  });

  describe('context leakage through before() callback', () => {
    let wasCalled;
    beforeEach(() => wasCalled = false);
    afterEach(() => assert.isTrue(wasCalled));

    before(done => {
      als.run('some-value', () => {
        done();
      });
    });

    it('should not see value leaked after done() callback of before()', () => {
      wasCalled = true;

      // expect
      assert.isUndefined(als.getStore());
    });
  });


  describe('it.skip()', () => {
    it.skip('should still work', () => {
      // if it() is overridden in a naive way, it.skip() might get lost
    });
  });
});
