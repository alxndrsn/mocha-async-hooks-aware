const {
  after,
  afterEach,
  before,
  beforeEach,
  it,
} = global;

global.it      = function(title, test) { return it     .call(this, title, cb2promise(test)); };
global.it.only = function(title, test) { return it.only.call(this, title, cb2promise(test)); }

global.after      = function(fn) { return after     .call(this, cb2promise(fn)); }
global.afterEach  = function(fn) { return afterEach .call(this, cb2promise(fn)); }
global.before     = function(fn) { return before    .call(this, cb2promise(fn)); }
global.beforeEach = function(fn) { return beforeEach.call(this, cb2promise(fn)); }

global.it.skip = it.skip;

function cb2promise(fn) {
  if(!fn || !fn.length) return fn;

  return function() {
    return new Promise((resolve, reject) => {
      fn.call(this, err => err ?  reject(err) : resolve());
    });
  }
}
