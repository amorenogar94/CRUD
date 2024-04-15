var data = require('../resources/users');
var userData = data;

module.exports.getUers = () => {
  return userData;
}

module.exports.addUser = (user) => {
  userData.push(user);
  return userData;
};

module.exports.deleteUser = (userId) => {
  userData = userData.filter(i => i.id != userId);
  return userData;
}

module.exports.updateUser = (userId, fields) => {
  var index = userData.findIndex(i => i.id == userId );
  if (!index) {
    return null;
  }
  var user = userData[index];
  userData[index] = { ...user, ...fields};
  return userData[index];
};

module.exports.getNewId = () => {
  var newId;
  try {
    newId = userData[userData.length-1].id + 1;
  } catch (error) {
    newId = 0 ;
  }
  return newId;
}