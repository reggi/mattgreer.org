var db = require('./dbp');

function getUsers() {
  return db.getUsers();
}

function getUsersAndThenDetails() {
  return db.getUsers().then(function(users) {
    return db.getDetails().then(function(details) {
      for(var i = 0; i < users.length; ++i) {
        var user = users[i];
        var detail = details[user.id];
        user.details = detail;
      }
      return users;
    });
  });
}

console.log('Getting Users');
var u = getUsers()
  
u.then(function(users) {
  console.log("users first time", users);
});

// u.then(function(users) {
//   console.log("USERS AGAIN! ", users);
// });
// 
// console.log('Getting users and details');
// getUsersAndThenDetails().then(function(users) {
//   console.log(users);
// });
// 
// 
