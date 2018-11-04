const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const clientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  middleName: {
    type: String,
    trim: true
  },
  suffix: {
    type: String,
    trim: true
  },
  dob: {
    type: String,
    trim: true
  },
  address: {
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String
    },
    zip: {
      type: String,
      trim: true
    }
  },
  primaryPhone: {
    type: String
  },
  secondaryPhone: {
    type: String
  },
  email: {
    type: String,
    trim: true
  }
});

clientSchema.plugin(timestamp);

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;