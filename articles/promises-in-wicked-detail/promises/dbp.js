var Promise = require('promise');

var users = [
  { id: 1, name: "Bob" },
  { id: 2, name: "Katie" },
  { id: 3, name: "Matt" },
  { id: 4, name: "Sarah" }
];

var details = {
  '1': {
    favoriteFood: 'tacos',
    age: 23
  },
  '2': {
    favoriteFood: 'bananas',
    age: 54
  },
  '3': {
    favoriteFood: 'steak',
    age: 36
  },
  '4': {
    favoriteFood: 'coffee',
    age: 36
  }
};

function returnPromise(result) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(result);
    }, 100);
  });
}

module.exports = {
  getUsers: function() {
    return returnPromise(users);
  },

  getDetails: function() {
    return returnPromise(details);
  },

  getUserDetails: function(id) {
    return returnPromise(details[id]);
  }
};


