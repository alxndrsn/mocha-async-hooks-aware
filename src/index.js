const {
  after,
  afterEach,
  before,
  beforeEach,
  it,
} = global;

global.it      = (title, test) => it     (title, cb2promise(test));
global.it.only = (title, test) => it.only(title, cb2promise(test));

global.after      = fn => after     (cb2promise(fn));
global.afterEach  = fn => afterEach (cb2promise(fn));
global.before     = fn => before    (cb2promise(fn));
global.beforeEach = fn => beforeEach(cb2promise(fn));

global.it.skip = it.skip;

function cb2promise(fn) {
  if(!fn || !fn.length) return fn;

  return function() {
    return new Promise((resolve, reject) => {
      fn.call(this, err => err ?  reject(err) : resolve());
    });
  }
}
