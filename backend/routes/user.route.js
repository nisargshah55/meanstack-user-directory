const express = require('express');
const app = express();
const userRoute = express.Router();

// User model
let User = require('../model/User');

// Add User
userRoute.route('/register').post((req, res) => {
  console.log(req.body);
  User.create(req.body, (error, data) => {
    console.log(data);
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Check User Login
userRoute.route('/login').post((req, res) => {
  console.log(req.body);
  User.findOne({
   email: req.body.email,
   password: req.body.password
  }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
})
})

module.exports = userRoute;