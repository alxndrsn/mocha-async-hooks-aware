const {
  after,
  afterEach,
  before,
  beforeEach,
  it,
} = global;

global.it = function(title, test) {
  return it.call(this, title, cb2promise(this, test));
};
global.it.skip = it.skip;
global.it.only = function(title, test) {
  return it.only.call(this, title, cb2promise(this, test));
}

global.after      = function(fn) { return after     .call(this, cb2promise(this, fn)); }
global.afterEach  = function(fn) { return afterEach .call(this, cb2promise(this, fn)); }
global.before     = function(fn) { return before    .call(this, cb2promise(this, fn)); }
global.beforeEach = function(fn) { return beforeEach.call(this, cb2promise(this, fn)); }

function cb2promise(that, fn) {
  if(!fn || !fn.length) return fn;

  return () => new Promise((resolve, reject) => {
    fn.call(that, err => err ?  reject(err) : resolve());
  });
}
