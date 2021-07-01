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

  describe('context leakage through beforeEach() callback', () => {
    let wasCalled;
    beforeEach(done => {
      wasCalled = false;
      als.run('some-value', () => {
        done();
      });
    });
    afterEach(() => assert.isTrue(wasCalled));

    it('should not see value leaked after done() callback of before()', () => {
      wasCalled = true;

      // expect
      assert.isUndefined(als.getStore());
    });
  });

  describe('context leakage through after() callback', () => {
    let wasCalled;
    beforeEach(() => wasCalled = false);
    afterEach(() => assert.isTrue(wasCalled));

    describe('something that sets up the leak', () => {
      after(done => {
        // when
        als.run('some-value', () => {

          // expect
          assert.equal(als.getStore(), 'some-value');

          done();
        });
      });

      it('should not have set the store value yet', () => {
        wasCalled = true;

        // expect
        assert.isUndefined(als.getStore());
      });
    });

    describe('something that executes after the leak', () => {
      it('should not see value leaked after done() callback of previous describe() block', () => {
        wasCalled = true;

        // expect
        assert.isUndefined(als.getStore());
      });
    });
  });

  describe('context leakage through afterEach() callback', () => {
    let wasCalled;
    beforeEach(() => wasCalled = false);
    afterEach(() => assert.isTrue(wasCalled));

    describe('something that sets up the leak', () => {
      afterEach(done => {
        assert.isTrue(wasCalled);

        // when
        als.run('some-value', () => {

          // expect
          assert.equal(als.getStore(), 'some-value');

          done();
        });
      });

      it('should not have set the store value yet', () => {
        wasCalled = true;

        // expect
        assert.isUndefined(als.getStore());
      });
    });

    describe('something that executes after the leak', () => {
      it('should not see value leaked after done() callback of previous describe() block', () => {
        wasCalled = true;

        // expect
        assert.isUndefined(als.getStore());
      });
    });
  });

  describe('it.skip()', () => {
    it.skip('should still work', () => {
      // if it() is overridden in a naive way, it.skip() might get lost
    });
  });

  describe('this.timeout()', () => {
    it('should still be available without callback', function() {
      // expect
      assert.isFunction(this.timeout);
    });

    it('should still be available with callback', function(done) {
      // expect
      assert.isFunction(this.timeout);

      done();
    });
  });
});
