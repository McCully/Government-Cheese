var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var publicAPI = {
  encryptPassword: function(password) {
    var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    return bcrypt.hashSync(password , salt);
  },
  comparePassword: function(canidatePassword , storedPassword) {
    console.log('comparing passwords');
    console.log(canidatePassword, storedPassword);
    return bcrypt.compareSync(canidatePassword , storedPassword);
  }
};

module.exports = publicAPI;
