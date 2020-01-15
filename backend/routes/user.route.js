const express = require('express');
const app = express();
const userRoute = express.Router();

// User model
let User = require('../model/User');
let sessionData;

// Add User
userRoute.route('/register').post((req, res) => {
  User.findOne({
    email: req.body.email,
  }, (error, data) => {
    if (data) {
      res.send('email exists');
    } else {
      User.create(req.body, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
    }
  })
});

// Check User Login
userRoute.route('/login').post((req, res) => {
  User.findOne({
    email: req.body.email,
    password: req.body.password
  }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      req.session.loguser = data;
      sessionData = req.session.loguser;
      res.json(data);
    }
  })
})

userRoute.route('/logout').get((req, res) => {
  req.session.loguser = null;
  sessionData = req.session.loguser;
  res.send("successful");
})

userRoute.route('/isLoggedIn').get((req, res) => {
  console.log(sessionData);
  res.send(sessionData ? true : false);
})

// Get All Users
userRoute.route('/getAllUsers').get((req, res) => {
  User.find((error, data) => {
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
    $set: req.body
  }, { new: true, upsert: true, useFindAndModify: false }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})

module.exports = userRoute;