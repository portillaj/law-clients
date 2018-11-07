const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.plugin(timestamp);

const User = mongoose.model('Customer', UserSchema);

module.exports = User;