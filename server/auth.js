const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.authenticate = (email, password) => {
  console.log('coming', email, password);
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email });
      // Match Password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
          console.log('this ran');
          resolve(user);
        } else {
          // password did not match
          reject('Authentication Failed');
        }
      });
    } catch(err) {
      // Email not found
      reject('Authentication Failed');
    }
  });
};