function Promise(fn) {
  var state = 'pending';
  var value;
  var deferred = null;

  function resolve(newValue) {
    value = newValue;
    state = 'resolved';

    if(deferred) {
      handle(deferred);
    }
  }

  function handle(onResolved) {
    if(state === 'pending') {
      deferred = onResolved;
      return;
    }

    // setTimeout(function() {
      onResolved(value);
    // }, 1);
  }

  this.then = function(onResolved) {
    handle(onResolved);
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
  
setTimeout(function() {
  p.then(function(result) {
    console.log("Got a result:", result);
  });
}, 200);


p.then(function(result) {
  console.log('got a result again:', result);
});
