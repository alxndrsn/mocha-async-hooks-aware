const { it } = global;

global.it = function(title, test) {
  if(test.length) {
    return it.call(this, title, () => new Promise((resolve, reject) => {
      test.call(this, err => {
        if(err) return reject(err);
        else    return resolve();
      });
    }));
  } else {
    return it.call(this, title, test);
  }
};
