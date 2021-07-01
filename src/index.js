const { it } = global;

global.it = function(title, test) {
  return it.call(this, title, cb2promise(this, test));
};
global.it.skip = it.skip;
global.it.only = function(title, test) {
  return it.only.call(this, title, cb2promise(this, test));
}

function cb2promise(that, test) {
  if(!test || !test.length) return test;

  return () => new Promise((resolve, reject) => {
    test.call(that, err => {
      if(err) return reject(err);
      else    return resolve();
    });
  });
}
