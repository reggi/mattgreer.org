
function finish() {
  var me = this;
  if(this.rejection && this.errback) {
    setTimeout(function() {
      me.errback(me.rejection);
    }, 1);
  }
  if(this.result && this.callback) {
    setTimeout(function() {
      me.callback(me.result);
    }, 1);
  }
}

function then(callback, errback) {
  this.callback = callback;
  this.errback = errback;
  
  finish.call(this);
}

function Deferred() {
  this.promise = {
    then: then.bind(this)
  };
}

Deferred.prototype = {
  reject: function(reason) {
    if(!this.hasOwnProperty('rejection')) {
      this.rejection = reason;
      finish.call(this);
    }
  },

  resolve: function(result) {
    if(!this.hasOwnProperty('result')) {
      this.result = result;
      finish.call(this);
    }
  }
};

module.exports = Deferred;





