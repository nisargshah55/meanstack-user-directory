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

// Get All Users
userRoute.route('/getAllUsers').get((req, res) => {
  User.find((error, data) => {
    console.log(data);
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get Specific User
userRoute.route('/getUserById/:id').get((req, res) => {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Delete User
userRoute.route('/deleteUser/:id').delete((req, res, next) => {
  User.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

// Update user
userRoute.route('/updateUserProfile/:id').put((req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
    $set: req.body}, {new: true, upsert: true, useFindAndModify: false}, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('User successfully updated!')
    }
  })
})


module.exports = userRoute;