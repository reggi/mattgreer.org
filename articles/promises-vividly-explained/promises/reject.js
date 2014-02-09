var id = 1;
function Promise(fn) {
  var pid = id++;
    var state = 'pending';
    var value;
    var deferred = null;

    function resolve(newValue) {
        try {
            if (newValue && typeof newValue.then === 'function') {
                newValue.then(resolve, reject);
                return;
            }
            state = 'resolved';
            value = newValue;

            if (deferred) {
                handle(deferred);
            }
        } catch (e) {
            reject(e);
        }
    }

    function reject(reason) {
      console.log("rejecting", pid);
        state = 'rejected';
        value = reason;

        if (deferred) {
            handle(deferred);
        }
    }

    function handle(handler) {
        if (state === 'pending') {
            deferred = handler;
            return;
        }
            var handlerCallback;

            if (state === 'resolved') {
                handlerCallback = handler.onResolved;
            } else {
                handlerCallback = handler.onRejected;
            }

            if (handlerCallback === null) {
                if (state === 'resolved') {
                    handler.resolve(value);
                } else {
                    handler.reject(value);
                }

                return;
            }

            var ret;
            try {
                ret = handlerCallback(value);
                handler.resolve(ret);
            } catch (e) {
                console.log("caught with pid", pid);
                handler.reject(e);
            }
    }

    this.then = function (onResolved, onRejected) {
        return new Promise(function (resolve, reject) {
            handle({
                onResolved: onResolved,
                onRejected: onRejected,
                resolve: resolve,
                reject: reject
            });
        });
    };

    fn(resolve, reject);
}

function getSomeJson() {
    return new Promise(function (resolve, reject) {
        var badJson = "<div>uh oh, this is not JSON at all!</div>";
        resolve(badJson);
    });
}

getSomeJson().then(function (json) {
    var obj = JSON.parse(json);
    console.log(obj);
}, function (error) {
    console.log('uh oh', error);
}).then(null, function (error) {
    console.log("got it");
});
