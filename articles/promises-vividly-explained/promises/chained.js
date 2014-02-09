function Promise(fn) {
  var state = 'pending';
  var value;
  var deferred = null;

  function resolve(newValue) {
    if(newValue && typeof newValue.then === 'function') {
      newValue.then(resolve);
      return;
    }
    state = 'resolved';
    value = newValue;
  
    if(deferred) {
      handle(deferred);
    }
  }

  function handle(handler) {
    if(state === 'pending') {
      deferred = handler;
      return;
    }

    if(handler.onFulfilled === null) {
      handler.resolve(value);
      return;
    }

    var ret = handler.onFulfilled(value);
    handler.resolve(ret);
  }

  this.then = function(onFulfilled) {
    return new Promise(function(resolve) {
      handle({
        onFulfilled: onFulfilled,
        resolve: resolve
      });
    });
  };

  fn(resolve);
}

function doSomething() {
  return new Promise(function(resolve) {
    var result = 42;
    resolve(result);
  });
}

var p = doSomething();
  
// setTimeout(function() {
//   p.then(function(result) {
//     console.log("Got a result:", result);
//   });
// }, 200);

function doSomethingAsync() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve('async');
    }, 100);
  });
}


p.then(function(result) {
  console.log('got a result', result);
  return doSomethingAsync();
}).then(function(nextResult) {
  console.log('next result: ' + nextResult);
  return 88;
}).then(function(thirdResult) {
  console.log('third: ', thirdResult);
});

