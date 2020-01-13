const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let User = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  dob: {
    type: Date,
    default: Date.now()
  },
  isAdmin: {
    type: Boolean,
    default: 0
  }
}, {
  collection: 'users'
})

module.exports = mongoose.model('User', User)