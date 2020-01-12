const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let User = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String
  },
  pass_word: {
    type: String
  },
  date_of_birth: {
    type: Date
  }
}, {
  collection: 'users'
})

module.exports = mongoose.model('User', User)