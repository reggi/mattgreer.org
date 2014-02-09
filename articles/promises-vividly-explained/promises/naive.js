function Promise(fn) {
  var callback = null;
  this.then = function(cb) {
    callback = cb;
  };

  function resolve(value) {
    process.nextTick(function() {
      callback(value);
    });
  }

  fn(resolve);
}

function doSomething() {
  return new Promise(function(resolve) {
    var result = 42;
    resolve(result);
  });
}

var p = doSomething()
  
process.nextTick(function() {
  p.then(function(result) {
    console.log("Got a result:", result);
  });
});


