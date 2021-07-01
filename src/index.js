/**
 * Wrapping approach from mocha-as-promised
 * @see https://github.com/domenic/mocha-as-promised/blob/7714899e5b5bc2da28964b928683c26bf131e520/mocha-as-promised.js
 */
Object.defineProperties(require('mocha').Runnable.prototype, {
  fn: {
    configurable: true,
    enumerable: true,
    get: function() {
      return this._outer;
    },
    set: function (fn) {
      if(!fn) return;

      if(!fn.length) {
        this._outer = fn;
        return;
      }

      this._outer = function() {
        return new Promise((resolve, reject) => {
          fn.call(this, err => console.log('returned:', err) || err ? reject(err) : resolve());
        });
      };
      this._outer.toString = () => {
        if(fn) return fn.toString();
      };
    },
  },
  async: {
    configurable: true,
    enumerable: true,
    get: function() {
      return false; // in mocha, "async" means non-sync, or promise-returning
    },
    set: function() {
      // Ignore Mocha trying to set this; it doesn't know the whole picture.
    }
  }
});
